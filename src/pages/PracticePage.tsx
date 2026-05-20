import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StreakData, PracticeRating, SessionsData, LanguageCode } from '../types';
import { calculateStreaks } from '../utils/streaks';
import { IMPROMPTU_TOPICS, MANDARIN_TOPICS, FRENCH_TOPICS } from '../data/topics';
import { TopicCard } from '../components/TopicCard';
import { Timer } from '../components/Timer';
import { LoggerModal } from '../components/LoggerModal';
import { ChevronLeft } from 'lucide-react';

const TOPIC_MAP: Record<string, string[]> = {
  en: IMPROMPTU_TOPICS,
  cn: MANDARIN_TOPICS,
  fr: FRENCH_TOPICS
};

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  cn: 'Mandarin',
  fr: 'French'
};

export default function PracticePage() {
  const { lang = 'en' } = useParams<{ lang: LanguageCode }>();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useLocalStorage<SessionsData>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [todaysTopics, setTodaysTopics] = useLocalStorage<Partial<Record<LanguageCode, string>>>('todaysTopics', {});
  const [showLogger, setShowLogger] = useState(false);

  const today = new Date().toLocaleDateString('en-CA');
  const daySessions = sessions[today] || {};
  const isCompletedToday = !!daySessions[lang as LanguageCode];

  // Topic generation logic
  const generateTopic = () => {
    const topics = TOPIC_MAP[lang];
    if (!topics) return;

    const usedTopics: string[] = [];
    Object.values(sessions).forEach(dayLogs => {
      Object.keys(dayLogs).forEach(l => {
        const log = dayLogs[l as LanguageCode];
        if (log?.topic) usedTopics.push(log.topic);
      });
    });

    const available = topics.filter(t => !usedTopics.includes(t));
    const pool = available.length > 0 ? available : topics;
    const randomTopic = pool[Math.floor(Math.random() * pool.length)];
    
    setTodaysTopics(prev => ({
      ...prev,
      [lang]: randomTopic
    }));
  };

  // Ensure a topic exists on load
  useEffect(() => {
    if (!isCompletedToday && !todaysTopics[lang as LanguageCode]) {
      generateTopic();
    }
  }, [lang, isCompletedToday]);

  const handleLog = (rating: PracticeRating, note: string) => {
    const topic = todaysTopics[lang as LanguageCode];
    if (!topic) return;
    
    const newSessions = { ...sessions };
    if (!newSessions[today]) newSessions[today] = {};
    
    newSessions[today][lang as LanguageCode] = { 
      date: today, 
      topic, 
      rating, 
      note,
      language: lang as LanguageCode,
      completedAt: new Date().toISOString()
    };
    
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setShowLogger(false);
  };

  const currentTopic = isCompletedToday 
    ? (daySessions[lang as LanguageCode]?.topic || '') 
    : (todaysTopics[lang as LanguageCode] || '');

  return (
    <div className="animate-fade-in pt-4 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-muted hover:text-main transition-colors text-sm font-semibold"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
        <div className="flex flex-col items-end">
          <h1 className="text-sm font-bold text-muted uppercase tracking-widest">
            {LANGUAGE_LABELS[lang] || 'English'} Practice
          </h1>
          {streak.current > 0 && (
            <span className="text-[10px] font-bold text-accent mt-1">
              🔥 {streak.current} DAY STREAK
            </span>
          )}
        </div>
      </header>

      <div className="flex flex-col items-center">
        <TopicCard topic={currentTopic || 'Generating prompt...'} />
        
        <div className="w-full mb-12">
          <Timer key={lang} />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          {isCompletedToday ? (
            <>
              <div className="p-4 bg-light rounded-2xl border border-accent-light text-center w-full">
                <p className="text-xs font-bold text-accent uppercase mb-1 tracking-wider">Session Complete</p>
                <p className="text-sm text-muted">You've finished your {LANGUAGE_LABELS[lang]} practice for today.</p>
              </div>
              <button 
                className="text-sm font-bold text-main hover:opacity-70 transition-opacity" 
                onClick={() => setShowLogger(true)}
              >
                Edit Practice Log
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-primary w-full shadow-lg shadow-accent/10" 
                style={{ maxWidth: '320px' }}
                onClick={() => setShowLogger(true)}
              >
                Complete & Log Practice
              </button>
              <button 
                className="text-sm font-semibold text-muted hover:text-main transition-colors"
                onClick={generateTopic}
              >
                Try a different topic
              </button>
            </>
          )}
        </div>
      </div>

      {showLogger && (todaysTopics[lang as LanguageCode] || isCompletedToday) && (
        <LoggerModal 
          topic={isCompletedToday ? (daySessions[lang as LanguageCode]?.topic || '') : (todaysTopics[lang as LanguageCode] as string)} 
          initialRating={isCompletedToday ? (daySessions[lang as LanguageCode]?.rating || 'Good') : 'Good'}
          initialNote={isCompletedToday ? (daySessions[lang as LanguageCode]?.note || '') : ''}
          onClose={() => setShowLogger(false)} 
          onLog={handleLog} 
        />
      )}
    </div>
  );
}
