import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { PracticeSession, PracticeRating, StreakData } from '../types';
import { LoggerModal } from '../components/LoggerModal';
import { Pencil, Trash2 } from 'lucide-react';
import { calculateStreaks } from '../utils/streaks';

export default function CalendarPage() {
  const [sessions, setSessions] = useLocalStorage<Record<string, PracticeSession>>('sessions', {});
  const [, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [selectedDay, setSelectedDay] = useState<PracticeSession | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [backfillDate, setBackfillDate] = useState<string | null>(null);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayStr = today.toLocaleDateString('en-CA');

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const startOffset = (firstDayOfWeek + 6) % 7; // shift to Monday start

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const gridDays = [];
  for (let i = 0; i < startOffset; i++) gridDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(currentYear, currentMonth, i);
    gridDays.push(d.toLocaleDateString('en-CA'));
  }

  const handleEdit = (rating: PracticeRating, note: string) => {
    if (!selectedDay) return;
    const newSessions = { ...sessions };
    newSessions[selectedDay.date] = { ...selectedDay, rating, note };
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setSelectedDay(newSessions[selectedDay.date]);
    setIsEditing(false);
  };

  const handleBackfill = (rating: PracticeRating, note: string) => {
    if (!backfillDate) return;
    const newSessions = { ...sessions };
    newSessions[backfillDate] = {
      date: backfillDate,
      topic: "Past Practice Check-in",
      rating,
      note
    };
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setBackfillDate(null);
  };

  const handleDelete = (dateStr: string) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;
    const newSessions = { ...sessions };
    delete newSessions[dateStr];
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    if (selectedDay?.date === dateStr) {
      setSelectedDay(null);
    }
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in pt-4 pb-8">
      <h1 className="text-xl font-semibold mb-8">Calendar</h1>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <h2 className="text-sm font-semibold mb-6 text-center text-main uppercase tracking-wide">
          {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdays.map((wd, i) => (
            <div key={i} className="text-center text-xs font-semibold text-muted">{wd}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {gridDays.map((dateStr, i) => {
            if (!dateStr) return <div key={i} />;
            
            const isCompleted = !!sessions[dateStr];
            const isToday = dateStr === todayStr;
            const isSelected = selectedDay?.date === dateStr;
            
            return (
              <button
                key={dateStr}
                disabled={!isCompleted && dateStr >= todayStr}
                onClick={() => {
                  if (isCompleted) setSelectedDay(sessions[dateStr]);
                  else if (dateStr < todayStr) setBackfillDate(dateStr);
                }}
                className={`flex items-center justify-center p-2 rounded-md aspect-square transition-all
                  ${isCompleted ? 'bg-accent text-white' : 'bg-light text-muted'}
                  ${isToday && !isCompleted ? 'border' : ''}
                  ${isSelected ? 'opacity-80 scale-95' : ''}
                `}
                style={{ borderWidth: isToday && !isCompleted ? '1px' : '0' }}
              >
                <span className={`text-sm font-medium ${isCompleted ? 'text-white' : 'text-muted'}`}>
                  {new Date(dateStr).getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && !isEditing && (
        <div className="mt-8 p-6 bg-white rounded-3xl shadow-sm border animate-fade-in relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wide">
              {new Date(selectedDay.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 bg-light rounded-full text-muted">{selectedDay.rating}</span>
              <button onClick={() => setIsEditing(true)} aria-label="Edit Session">
                <Pencil size={16} className="text-muted hover:text-main transition-colors" strokeWidth={2.5} />
              </button>
              <button onClick={() => handleDelete(selectedDay.date)} aria-label="Delete Session">
                <Trash2 size={16} className="text-red-400 hover:text-red-600 transition-colors" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <p className="text-lg font-medium mb-4">{selectedDay.topic}</p>
          {selectedDay.note && (
            <p className="text-main leading-relaxed p-4 bg-light rounded-2xl text-sm border">
              {selectedDay.note}
            </p>
          )}
        </div>
      )}

      {selectedDay && isEditing && (
        <LoggerModal
          topic={selectedDay.topic}
          initialRating={selectedDay.rating}
          initialNote={selectedDay.note}
          onClose={() => setIsEditing(false)}
          onLog={handleEdit}
        />
      )}

      {backfillDate && (
        <LoggerModal
          topic={`Log Practice for ${new Date(backfillDate + 'T12:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
          initialRating="Good"
          initialNote=""
          onClose={() => setBackfillDate(null)}
          onLog={handleBackfill}
        />
      )}
    </div>
  );
}
