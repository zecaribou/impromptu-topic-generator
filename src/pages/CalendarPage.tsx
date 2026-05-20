import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StreakData, PracticeRating, LanguageCode } from '../types';
import { LoggerModal } from '../components/LoggerModal';
import { Pencil, Trash2, ChevronLeft, ChevronRight, AlertCircle, RefreshCcw } from 'lucide-react';
import { calculateStreaks } from '../utils/streaks';

const LANGUAGE_CONFIG: Record<string, { label: string; color: string; short: string }> = {
  en: { label: 'English', color: '#007AFF', short: 'EN' },
  cn: { label: '中文', color: '#FF9500', short: '中' },
  fr: { label: 'Français', color: '#5856D6', short: 'FR' }
};

export default function CalendarPage() {
  const [sessions, setSessions] = useLocalStorage<any>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingLang, setEditingLang] = useState<LanguageCode | null>(null);
  const [backfillDate, setBackfillDate] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(() => new Date());

  // Migration logic
  useEffect(() => {
    try {
      if (!sessions || typeof sessions !== 'object') return;
      
      let needsUpdate = false;
      const migrated: Record<string, any> = {};

      if (Array.isArray(sessions)) {
        needsUpdate = true;
        sessions.forEach((s: any) => {
          if (s && s.date) {
            const d = String(s.date);
            if (!migrated[d]) migrated[d] = {};
            migrated[d].en = { ...s, language: 'en', completedAt: s.completedAt || new Date().toISOString() };
          }
        });
      } else {
        const keys = Object.keys(sessions);
        if (keys.length > 0) {
          const firstVal = sessions[keys[0]];
          if (firstVal && firstVal.topic && !firstVal.en && !firstVal.cn && !firstVal.fr) {
            needsUpdate = true;
            keys.forEach(date => {
              const old = sessions[date];
              migrated[date] = { 
                en: { ...old, language: 'en', completedAt: old.completedAt || new Date().toISOString() } 
              };
            });
          }
        }
      }

      if (needsUpdate) {
        setSessions(migrated);
        setStreak(calculateStreaks(migrated as any));
      }
    } catch (e) {
      console.error("Migration error", e);
    }
  }, []);

  // Wrap evaluation in a try-block
  try {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const changeMonth = (offset: number) => {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const handleEdit = (rating: PracticeRating, note: string) => {
      try {
        if (!selectedDate || !editingLang) return;
        const newSessions = { ...sessions };
        if (!newSessions[selectedDate]?.[editingLang]) return;
        newSessions[selectedDate][editingLang] = { ...newSessions[selectedDate][editingLang], rating, note };
        setSessions(newSessions);
        setStreak(calculateStreaks(newSessions));
        setEditingLang(null);
      } catch (e) { console.error(e); }
    };

    const handleDelete = (dateStr: string, lang: LanguageCode) => {
      try {
        if (!window.confirm(`Delete ${LANGUAGE_CONFIG[lang]?.label || 'session'}?`)) return;
        const newSessions = { ...sessions };
        if (newSessions[dateStr]) {
          delete newSessions[dateStr][lang];
          if (Object.keys(newSessions[dateStr]).length === 0) delete newSessions[dateStr];
          setSessions(newSessions);
          setStreak(calculateStreaks(newSessions));
        }
      } catch (e) { console.error(e); }
    };

    const grid = [];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    for (let i = 0; i < startOffset; i++) grid.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
    }

    const selectedDayLogs = selectedDate && sessions ? sessions[selectedDate] : null;

    return (
      <div className="animate-fade-in pt-4 pb-8">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-xl font-semibold">Calendar</h1>
          <div className="flex gap-4">
            {Object.entries(LANGUAGE_CONFIG).map(([code, cfg]) => (
              <div key={code} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{cfg.short}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-light rounded-full transition-colors"><ChevronLeft size={20} /></button>
            <h2 className="text-sm font-bold uppercase tracking-widest">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-light rounded-full transition-colors"><ChevronRight size={20} /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekdays.map((wd, i) => (<div key={i} className="text-center text-[10px] font-bold text-muted">{wd}</div>))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {grid.map((dateStr, i) => {
              if (!dateStr) return <div key={i} />;
              const daySessions = (sessions && typeof sessions === 'object' ? sessions[dateStr] : {}) || {};
              const completedLangs = Object.keys(daySessions).filter(l => LANGUAGE_CONFIG[l]);
              const isToday = dateStr === todayStr;
              const isFuture = dateStr > todayStr;
              
              return (
                <button
                  key={dateStr}
                  disabled={completedLangs.length === 0 && isFuture}
                  onClick={() => {
                    if (completedLangs.length > 0) setSelectedDate(dateStr);
                    else if (!isFuture) setBackfillDate(dateStr);
                  }}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl aspect-square transition-all relative border-2 
                    ${completedLangs.length > 0 ? 'bg-light border-transparent' : 'bg-transparent border-transparent'}
                    ${isToday ? 'border-accent' : ''}
                    ${isFuture && completedLangs.length === 0 ? 'opacity-20' : ''}
                  `}
                >
                  <span className={`text-xs font-bold ${completedLangs.length > 0 ? 'text-main' : 'text-muted'}`}>{dateStr.split('-')[2]}</span>
                  <div className="flex gap-0.5 mt-auto">
                    {completedLangs.map(l => (
                      <div key={l} className="w-1 h-1 rounded-full" style={{ backgroundColor: LANGUAGE_CONFIG[l].color }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && selectedDayLogs && typeof selectedDayLogs === 'object' && (
          <div className="mt-8 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-xs font-bold text-muted uppercase tracking-widest">{selectedDate}</h2>
              <button onClick={() => setSelectedDate(null)} className="text-xs font-bold text-accent">Close</button>
            </div>
            {Object.keys(LANGUAGE_CONFIG).map((langCode) => {
              const log = selectedDayLogs[langCode];
              const cfg = LANGUAGE_CONFIG[langCode];
              return (
                <div key={langCode} className={`p-6 bg-white rounded-3xl shadow-sm border ${!log ? 'opacity-30' : ''}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                       <h3 className="text-sm font-bold">{cfg.label}</h3>
                    </div>
                    {log && (
                      <div className="flex items-center gap-3">
                        <button onClick={() => setEditingLang(langCode as LanguageCode)}><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(selectedDate, langCode as LanguageCode)}><Trash2 size={15} className="text-red-400" /></button>
                      </div>
                    )}
                  </div>
                  {log && <p className="text-sm font-medium">{log.topic}</p>}
                </div>
              );
            })}
          </div>
        )}

        {editingLang && selectedDate && sessions[selectedDate]?.[editingLang] && (
          <LoggerModal
            topic={sessions[selectedDate][editingLang].topic}
            initialRating={sessions[selectedDate][editingLang].rating}
            initialNote={sessions[selectedDate][editingLang].note}
            onClose={() => setEditingLang(null)}
            onLog={handleEdit}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Critical rendering error in CalendarPage", error);
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl shadow-sm border mt-8">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-lg font-bold mb-2">Sync Error</h2>
        <p className="text-sm text-muted mb-6">Your history has a format conflict. We can try to repair it or you can clear it to start fresh.</p>
        <div className="flex flex-col gap-3 w-full max-w-[240px]">
          <button onClick={() => window.location.reload()} className="btn-primary flex items-center justify-center gap-2">
            <RefreshCcw size={16} /> Try Repair
          </button>
          <button onClick={() => {
            if(confirm("This will permanently clear your local practice history. Continue?")) {
              localStorage.removeItem('sessions');
              localStorage.removeItem('streak');
              window.location.reload();
            }
          }} className="text-xs font-bold text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors">
            Reset All History
          </button>
        </div>
      </div>
    );
  }
}
