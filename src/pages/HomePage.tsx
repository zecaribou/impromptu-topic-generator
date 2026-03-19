import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { PracticeSession, StreakData, PracticeRating } from '../types';
import { IMPROMPTU_TOPICS } from '../data/topics';
import { TopicCard } from '../components/TopicCard';
import { Timer } from '../components/Timer';
import { LoggerModal } from '../components/LoggerModal';

export default function HomePage() {
  const [sessions, setSessions] = useLocalStorage<Record<string, PracticeSession>>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [todaysTopic, setTodaysTopic] = useLocalStorage<string | null>('todaysTopic', null);
  const [showLogger, setShowLogger] = useState(false);

  const today = new Date().toLocaleDateString('en-CA');
  const isCompletedToday = !!sessions[today];

  useEffect(() => {
    if (!todaysTopic && !isCompletedToday) {
      generateTopic();
    }
  }, []);

  const generateTopic = () => {
    const usedTopics = Object.values(sessions).map(s => s.topic);
    const available = IMPROMPTU_TOPICS.filter(t => !usedTopics.includes(t));
    const pool = available.length > 0 ? available : IMPROMPTU_TOPICS;
    const randomTopic = pool[Math.floor(Math.random() * pool.length)];
    setTodaysTopic(randomTopic);
  };

  const handleLog = (rating: PracticeRating, note: string) => {
    if (!todaysTopic) return;
    const newSessions = { ...sessions };
    newSessions[today] = { date: today, topic: todaysTopic, rating, note };
    setSessions(newSessions);
    
    let newCurrent = streak.current;
    if (streak.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toLocaleDateString('en-CA');
      if (streak.lastDate === yesterdayStr) {
        newCurrent += 1;
      } else {
        newCurrent = 1;
      }
    }
    setStreak({
      current: newCurrent,
      longest: Math.max(streak.longest, newCurrent),
      lastDate: today
    });
    setShowLogger(false);
  };

  return (
    <div className="animate-fade-in pt-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Impromptu Practice</h1>
        <div className="text-sm font-medium text-muted">
          {streak.current > 0 ? `🔥 ${streak.current}-day streak` : ''}
        </div>
      </div>

      <TopicCard topic={isCompletedToday ? sessions[today].topic : (todaysTopic || '')} />

      <Timer />

      <div className="flex flex-col items-center mt-8 px-4 w-full">
        {isCompletedToday ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-center text-muted font-medium py-4">
              Practice completed today
            </p>
            <button className="text-sm font-semibold text-main" onClick={() => setShowLogger(true)}>
              Edit Session
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <button className="btn-primary w-full" style={{ maxWidth: '340px' }} onClick={generateTopic}>
              Generate Topic
            </button>
            <button className="text-muted mt-6 font-medium" onClick={() => setShowLogger(true)}>
              Log Practice
            </button>
          </div>
        )}
      </div>

      {showLogger && (todaysTopic || isCompletedToday) && (
        <LoggerModal 
          topic={isCompletedToday ? sessions[today].topic : (todaysTopic as string)} 
          initialRating={isCompletedToday ? sessions[today].rating : 'Good'}
          initialNote={isCompletedToday ? sessions[today].note : ''}
          onClose={() => setShowLogger(false)} 
          onLog={handleLog} 
        />
      )}
    </div>
  );
}
