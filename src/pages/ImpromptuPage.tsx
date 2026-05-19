import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { PracticeSession, StreakData, PracticeRating, SessionsData, LanguageCode } from '../types';
import { calculateStreaks } from '../utils/streaks';
import { IMPROMPTU_TOPICS, MANDARIN_TOPICS, FRENCH_TOPICS } from '../data/topics';
import { TopicCard } from '../components/TopicCard';
import { Timer } from '../components/Timer';
import { LoggerModal } from '../components/LoggerModal';
import { Globe } from 'lucide-react';

const TOPIC_MAP: Record<LanguageCode, string[]> = {
  en: IMPROMPTU_TOPICS,
  cn: MANDARIN_TOPICS,
  fr: FRENCH_TOPICS
};

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: 'English',
  cn: 'Mandarin',
  fr: 'French'
};

export default function ImpromptuPage() {
  const [sessions, setSessions] = useLocalStorage<SessionsData>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [todaysTopic, setTodaysTopic] = useLocalStorage<string | null>('todaysTopic', null);
  const [selectedLang, setSelectedLang] = useLocalStorage<LanguageCode>('selectedLanguage', 'en');
  const [showLogger, setShowLogger] = useState(false);

  const today = new Date().toLocaleDateString('en-CA');
  const isCompletedTodayInLang = !!(sessions[today] && sessions[today][selectedLang]);

  // Migration logic
  useEffect(() => {
    const rawSessions = localStorage.getItem('sessions');
    if (rawSessions) {
      try {
        const parsed = JSON.parse(rawSessions);
        // Check if old format: Record<string, { date, topic, rating, note }>
        const firstKey = Object.keys(parsed)[0];
        if (firstKey && parsed[firstKey].topic && !parsed[firstKey].en && !parsed[firstKey].cn && !parsed[firstKey].fr) {
          const migrated: SessionsData = {};
          Object.keys(parsed).forEach(date => {
            migrated[date] = {
              en: { 
                ...parsed[date], 
                language: 'en', 
                completedAt: parsed[date].completedAt || new Date(date).toISOString() 
              }
            };
          });
          setSessions(migrated);
          setStreak(calculateStreaks(migrated));
        }
      } catch (e) {
        console.error("Migration failed", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!todaysTopic && !isCompletedTodayInLang) {
      generateTopic(selectedLang);
    }
  }, [selectedLang]);

  const generateTopic = (lang: LanguageCode = selectedLang) => {
    const topics = TOPIC_MAP[lang];
    // Flat used topics list across all sessions and languages
    const usedTopics: string[] = [];
    Object.values(sessions).forEach(dayLogs => {
      Object.values(dayLogs).forEach(log => {
        if (log?.topic) usedTopics.push(log.topic);
      });
    });

    const available = topics.filter(t => !usedTopics.includes(t));
    const pool = available.length > 0 ? available : topics;
    const randomTopic = pool[Math.floor(Math.random() * pool.length)];
    setTodaysTopic(randomTopic);
  };

  const handleLog = (rating: PracticeRating, note: string) => {
    if (!todaysTopic) return;
    const newSessions = { ...sessions };
    if (!newSessions[today]) newSessions[today] = {};
    
    newSessions[today][selectedLang] = { 
      date: today, 
      topic: todaysTopic, 
      rating, 
      note,
      language: selectedLang,
      completedAt: new Date().toISOString()
    };
    
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setShowLogger(false);
  };

  return (
    <div className="animate-fade-in pt-4">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Impromptu Practice</h1>
          <div className="text-sm font-medium text-muted">
            {streak.current > 0 ? `🔥 ${streak.current}-day streak` : ''}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {(Object.keys(TOPIC_MAP) as LanguageCode[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                if (!sessions[today]?.[lang]) generateTopic(lang);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border
                ${selectedLang === lang 
                  ? 'bg-accent text-white border-accent shadow-sm' 
                  : 'bg-white text-muted border-light hover:border-muted hover:text-main'}
              `}
            >
              <Globe size={12} className={selectedLang === lang ? 'text-white/80' : 'text-muted'} />
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      <TopicCard topic={isCompletedTodayInLang ? (sessions[today]?.[selectedLang]?.topic || '') : (todaysTopic || '')} />

      <Timer />

      <div className="flex flex-col items-center mt-8 px-4 w-full">
        {isCompletedTodayInLang ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-center text-muted font-medium py-4">
              {LANGUAGE_LABELS[selectedLang]} practice completed today
            </p>
            <button className="text-sm font-semibold text-main" onClick={() => setShowLogger(true)}>
              Edit Session
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <button className="btn-primary w-full" style={{ maxWidth: '340px' }} onClick={() => generateTopic()}>
              Generate Topic
            </button>
            <button className="text-muted mt-6 font-medium" onClick={() => setShowLogger(true)}>
              Log Practice
            </button>
          </div>
        )}
      </div>

      {showLogger && (todaysTopic || isCompletedTodayInLang) && (
        <LoggerModal 
          topic={isCompletedTodayInLang ? (sessions[today]?.[selectedLang]?.topic || '') : (todaysTopic as string)} 
          initialRating={isCompletedTodayInLang ? (sessions[today]?.[selectedLang]?.rating || 'Good') : 'Good'}
          initialNote={isCompletedTodayInLang ? (sessions[today]?.[selectedLang]?.note || '') : ''}
          onClose={() => setShowLogger(false)} 
          onLog={handleLog} 
        />
      )}
    </div>
  );
}
