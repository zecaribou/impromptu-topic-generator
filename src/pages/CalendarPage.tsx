import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { SessionsData, PracticeRating, StreakData, LanguageCode } from '../types';
import { LoggerModal } from '../components/LoggerModal';
import { Pencil, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { calculateStreaks } from '../utils/streaks';

const LANGUAGE_CONFIG: Record<LanguageCode, { label: string; color: string; short: string }> = {
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
  const [hasError, setHasError] = useState(false);

  // Migration and Data Cleanup
  useEffect(() => {
    try {
      if (!sessions) return;
      
      let needsUpdate = false;
      let migrated: SessionsData = {};

      // Case 1: sessions is an array (very old legacy)
      if (Array.isArray(sessions)) {
        needsUpdate = true;
        sessions.forEach((s: any) => {
          if (s && s.date) {
            if (!migrated[s.date]) migrated[s.date] = {};
            migrated[s.date].en = { ...s, language: 'en', completedAt: s.completedAt || new Date(s.date).toISOString() };
          }
        });
      } 
      // Case 2: sessions is a record but in the old non-nested format
      else if (typeof sessions === 'object') {
        const keys = Object.keys(sessions);
        if (keys.length > 0) {
          const firstVal = sessions[keys[0]];
          // Check if first value has 'topic' directly (old format)
          if (firstVal && firstVal.topic && !firstVal.en && !firstVal.cn && !firstVal.fr) {
            needsUpdate = true;
            keys.forEach(date => {
              const oldSession = sessions[date];
              migrated[date] = {
                en: { 
                  ...oldSession, 
                  language: 'en', 
                  completedAt: oldSession.completedAt || new Date(date).toISOString() 
                }
              };
            });
          }
        }
      }

      if (needsUpdate) {
        console.log("Migrating sessions data...");
        setSessions(migrated);
        setStreak(calculateStreaks(migrated));
      }
    } catch (e) {
      console.error("Migration failed", e);
    }
  }, []);

  // Safe Grid Calculation
  const calendarData = useMemo(() => {
    try {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const startOffset = (firstDay + 6) % 7; // Monday start
      
      const grid = [];
      for (let i = 0; i < startOffset; i++) grid.push(null);
      for (let i = 1; i <= daysInMonth; i++) {
        grid.push(new Date(year, month, i).toLocaleDateString('en-CA'));
      }
      return grid;
    } catch (e) {
      setHasError(true);
      return [];
    }
  }, [viewDate]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Calendar Error</h2>
        <p className="text-muted mb-6">We encountered an issue loading your history. Clearing your browser cache may help.</p>
        <button onClick={() => window.location.reload()} className="btn-primary px-8">Reload App</button>
      </div>
    );
  }

  const todayStr = new Date().toLocaleDateString('en-CA');
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const changeMonth = (offset: number) => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const handleEdit = (rating: PracticeRating, note: string) => {
    if (!selectedDate || !editingLang) return;
    const newSessions = { ...sessions };
    if (!newSessions[selectedDate]?.[editingLang]) return;
    
    newSessions[selectedDate][editingLang] = { ...newSessions[selectedDate][editingLang], rating, note };
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setEditingLang(null);
  };

  const handleDelete = (dateStr: string, lang: LanguageCode) => {
    if (!window.confirm(`Delete ${LANGUAGE_CONFIG[lang].label} log?`)) return;
    const newSessions = { ...sessions };
    if (newSessions[dateStr]) {
      delete newSessions[dateStr][lang];
      if (Object.keys(newSessions[dateStr]).length === 0) delete newSessions[dateStr];
      setSessions(newSessions);
      setStreak(calculateStreaks(newSessions));
    }
  };

  const selectedDayLogs = selectedDate && sessions ? sessions[selectedDate] : null;

  return (
    <div className="animate-fade-in pt-4 pb-8">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-xl font-semibold">Calendar</h1>
        <div className="flex gap-4 pb-1">
          {(Object.entries(LANGUAGE_CONFIG) as [LanguageCode, any][]).map(([code, cfg]) => (
            <div key={code} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
              <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-light rounded-full transition-colors text-muted">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-sm font-semibold text-center text-main uppercase tracking-wide">
            {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-light rounded-full transition-colors text-muted">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdays.map((wd, i) => (
            <div key={i} className="text-center text-xs font-semibold text-muted">{wd}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((dateStr, i) => {
            if (!dateStr) return <div key={i} />;
            
            const daySessions = (sessions && typeof sessions === 'object' ? sessions[dateStr] : {}) || {};
            const completedLangs = (Object.keys(daySessions) as LanguageCode[]).filter(l => LANGUAGE_CONFIG[l]);
            const isCompleted = completedLangs.length > 0;
            const isToday = dateStr === todayStr;
            const isSelected = selectedDate === dateStr;
            const isFuture = dateStr > todayStr;
            
            return (
              <button
                key={dateStr}
                disabled={!isCompleted && isFuture}
                onClick={() => {
                  if (isCompleted) setSelectedDate(dateStr);
                  else if (!isFuture) setBackfillDate(dateStr);
                }}
                className={`flex flex-col items-center justify-between p-2 rounded-xl aspect-square transition-all relative
                  ${isCompleted ? 'bg-light' : 'bg-transparent'}
                  ${isToday ? 'border-2 border-accent' : 'border border-transparent'}
                  ${!isCompleted && !isFuture ? 'bg-accent-light/10' : ''}
                  ${isFuture ? 'opacity-30' : ''}
                  ${isSelected ? 'ring-2 ring-accent ring-inset' : ''}
                  active:scale-95
                `}
              >
                <span className={`text-sm font-semibold ${isCompleted ? 'text-main' : 'text-muted'}`}>
                  {dateStr.split('-')[2]}
                </span>
                
                <div className="flex gap-0.5 mt-auto">
                  {completedLangs.map(lang => (
                    <div 
                      key={lang} 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: LANGUAGE_CONFIG[lang].color }} 
                    />
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
            <h2 className="text-xs font-bold text-muted uppercase tracking-widest">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
            </h2>
            <button onClick={() => setSelectedDate(null)} className="text-xs font-bold text-accent">Close</button>
          </div>

          {(Object.keys(LANGUAGE_CONFIG) as LanguageCode[]).map((langCode) => {
            const log = selectedDayLogs[langCode];
            const cfg = LANGUAGE_CONFIG[langCode];
            return (
              <div key={langCode} className={`p-6 bg-white rounded-3xl shadow-sm border transition-opacity ${!log ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                    <h3 className="text-sm font-bold text-main">{cfg.label}</h3>
                  </div>
                  {log && (
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-light rounded-full text-muted uppercase tracking-wider">
                        {log.rating}
                      </span>
                      <button onClick={() => setEditingLang(langCode)} aria-label="Edit Session">
                        <Pencil size={15} className="text-muted hover:text-main transition-colors" />
                      </button>
                      <button onClick={() => handleDelete(selectedDate, langCode)} aria-label="Delete Session">
                        <Trash2 size={15} className="text-red-400 hover:text-red-600 transition-colors" />
                      </button>
                    </div>
                  )}
                </div>
                
                {log ? (
                  <>
                    <p className="text-base font-medium mb-4 leading-tight">{log.topic}</p>
                    {log.note && (
                      <p className="text-main leading-relaxed p-4 bg-light rounded-2xl text-xs border border-accent-light">
                        {log.note}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-xs font-medium text-muted italic">No practice logged for this language.</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {editingLang && selectedDate && sessions[selectedDate]?.[editingLang] && (
        <LoggerModal
          topic={sessions[selectedDate][editingLang]!.topic}
          initialRating={sessions[selectedDate][editingLang]!.rating}
          initialNote={sessions[selectedDate][editingLang]!.note}
          onClose={() => setEditingLang(null)}
          onLog={handleEdit}
        />
      )}

      {backfillDate && (
        <LoggerModal
          topic={`Log Practice for ${new Date(backfillDate + 'T12:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
          initialRating="Good"
          initialNote=""
          onClose={() => setBackfillDate(null)}
          onLog={(rating, note) => {
            const newSessions = { ...sessions };
            if (!newSessions[backfillDate]) newSessions[backfillDate] = {};
            newSessions[backfillDate].en = {
              date: backfillDate,
              topic: "Past Practice",
              rating,
              note,
              language: 'en',
              completedAt: new Date().toISOString()
            };
            setSessions(newSessions);
            setStreak(calculateStreaks(newSessions));
            setBackfillDate(null);
          }}
        />
      )}
    </div>
  );
}
