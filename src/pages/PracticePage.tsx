import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StreakData, PracticeRating, SessionsData, LanguageCode, ModeCode, DifficultyCode } from '../types';
import { calculateStreaks } from '../utils/streaks';
import { TOPICS } from '../data/topics';
import { TopicCard } from '../components/TopicCard';
import { Timer } from '../components/Timer';
import { LoggerModal } from '../components/LoggerModal';

const COPY = {
  en: {
    headline: "Think fast. Speak clearly.",
    subheadline: "Generate a prompt, start the timer, and practise speaking off the cuff.",
    workDesc: "Practise interviews, pitches, networking, and structured answers.",
    casualDesc: "Warm up with playful prompts, odd opinions, and low-pressure speaking drills.",
    generateTopic: "Generate Topic",
    tryDifferent: "Try a different topic",
    completeLog: "Complete & Log Practice",
    completeTitle: "Session Complete",
    completeBody: "You've finished your English practice for today.",
    editLog: "Edit Practice Log",
    streak: (count: number) => `🔥 ${count} DAY STREAK`,
    generating: "Generating prompt..."
  },
  cn: {
    headline: "快速思考，清晰表达。",
    subheadline: "生成提示、启动计时器，并进行即兴演讲练习。",
    workDesc: "练习面试、推介、社交和结构化回答。",
    casualDesc: "用有趣的提示、奇特的观点和低压力的说话训练来热身。",
    generateTopic: "生成新主题",
    tryDifferent: "换个主题",
    completeLog: "完成并记录练习",
    completeTitle: "今日练习已完成",
    completeBody: "您已完成了今天的中文练习。",
    editLog: "修改练习记录",
    streak: (count: number) => `🔥 ${count} 天连续练习`,
    generating: "生成提示中..."
  },
  es: {
    headline: "Piensa rápido. Habla claro.",
    subheadline: "Genera un tema, inicia el temporizador y practica la oratoria improvisada.",
    workDesc: "Practica entrevistas, discursos, networking y respuestas estructuradas.",
    casualDesc: "Calienta con temas lúdicos, opiniones peculiares y ejercicios sencillos de expresión oral.",
    generateTopic: "Generar Tema",
    tryDifferent: "Probar otro tema",
    completeLog: "Completar y Registrar Práctica",
    completeTitle: "Sesión Completada",
    completeBody: "Has terminado tu práctica de español por hoy.",
    editLog: "Editar Registro de Práctica",
    streak: (count: number) => `🔥 Racha de ${count} días`,
    generating: "Generando tema..."
  },
  fr: {
    headline: "Pensez vite. Parlez clairement.",
    subheadline: "Générez un sujet, lancez le chronomètre et entraînez-vous à parler à l'improviste.",
    workDesc: "Entraînez-vous aux entretiens, pitchs, networking et réponses structurées.",
    casualDesc: "Échauffez-vous avec des sujets ludiques, des opinions insolites et des exercices de parole sans pression.",
    generateTopic: "Générer un sujet",
    tryDifferent: "Essayer un autre sujet",
    completeLog: "Terminer & Enregistrer la pratique",
    completeTitle: "Session terminée",
    completeBody: "Vous avez terminé votre pratique de français pour aujourd'hui.",
    editLog: "Modifier le journal de pratique",
    streak: (count: number) => `🔥 Série de ${count} jours`,
    generating: "Génération du sujet..."
  }
};

const SELECTOR_LABELS = {
  en: {
    casual: 'Casual',
    work: 'Work',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  },
  cn: {
    casual: '轻松',
    work: '工作',
    easy: '简单',
    medium: '中等',
    hard: '困难'
  },
  es: {
    casual: 'Informal',
    work: 'Profesional',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil'
  },
  fr: {
    casual: 'Informel',
    work: 'Professionnel',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile'
  }
};

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'cn', label: '中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
];

export default function PracticePage() {
  const [lang, setLang] = useLocalStorage<LanguageCode>('selectedLanguage', 'en');
  const [mode, setMode] = useLocalStorage<ModeCode>('selectedMode', 'casual');
  const [difficulty, setDifficulty] = useLocalStorage<DifficultyCode>('selectedDifficulty', 'easy');
  
  const [sessions, setSessions] = useLocalStorage<SessionsData>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [todaysTopics, setTodaysTopics] = useLocalStorage<Record<string, string>>('todaysTopics', {});
  const [showLogger, setShowLogger] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-CA');
  const daySessions = sessions[today] || {};
  const isCompletedToday = !!daySessions[lang];

  const topicKey = `${lang}-${mode}-${difficulty}`;
  const t = COPY[lang] || COPY.en;
  const sel = SELECTOR_LABELS[lang] || SELECTOR_LABELS.en;
  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Topic generation logic
  const generateTopic = () => {
    const pool = TOPICS[lang]?.[mode]?.[difficulty];
    if (!pool) return;

    const usedTopics: string[] = [];
    Object.values(sessions).forEach(dayLogs => {
      if (dayLogs) {
        Object.keys(dayLogs).forEach(l => {
          const log = dayLogs[l as LanguageCode];
          if (log?.topic) usedTopics.push(log.topic);
        });
      }
    });

    const available = pool.filter(t => !usedTopics.includes(t));
    const selectedPool = available.length > 0 ? available : pool;
    const randomTopic = selectedPool[Math.floor(Math.random() * selectedPool.length)];
    
    setTodaysTopics(prev => ({
      ...prev,
      [topicKey]: randomTopic
    }));
  };

  // Ensure a topic exists on load or configuration change
  useEffect(() => {
    if (!isCompletedToday && !todaysTopics[topicKey]) {
      generateTopic();
    }
  }, [lang, mode, difficulty, isCompletedToday]);

  const handleLog = (rating: PracticeRating, note: string) => {
    const topic = todaysTopics[topicKey];
    if (!topic) return;
    
    const newSessions = { ...sessions };
    if (!newSessions[today]) newSessions[today] = {};
    
    newSessions[today][lang] = { 
      date: today, 
      topic, 
      rating, 
      note,
      language: lang,
      completedAt: new Date().toISOString(),
      mode,
      difficulty
    };
    
    setSessions(newSessions);
    setStreak(calculateStreaks(newSessions));
    setShowLogger(false);
  };

  const currentTopic = isCompletedToday 
    ? (daySessions[lang]?.topic || '') 
    : (todaysTopics[topicKey] || '');

  return (
    <div className="animate-fade-in pt-4 max-w-2xl mx-auto w-full">
      <header className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-sm font-bold text-muted uppercase tracking-widest">
          Impromptu Practice
        </h1>
        {streak.perLanguage?.[lang]?.current !== undefined && streak.perLanguage[lang].current > 0 && (
          <span className="text-[10px] font-bold text-accent">
            {t.streak(streak.perLanguage[lang].current)}
          </span>
        )}
      </header>

      {/* Copy Intro */}
      <div className="flex flex-col items-center text-center w-full mb-10 max-w-2xl mx-auto px-4">
        <h1 className="hero-title text-center mb-4">
          {t.headline}
        </h1>
        <p className="hero-subtitle text-center text-muted max-w-[420px] mb-2">
          {t.subheadline}
        </p>
        <p className="text-xs font-semibold text-accent/80 uppercase tracking-widest max-w-[450px]">
          {mode === 'work' ? t.workDesc : t.casualDesc}
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 w-full max-w-xl mx-auto px-4">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-light bg-white text-xs font-bold hover:border-muted hover:bg-light transition-all shadow-sm cursor-pointer"
            style={{ minWidth: '120px', justifyContent: 'space-between' }}
          >
            <span className="flex items-center gap-1.5">
              <span>{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
            </span>
            <span className="text-[9px] text-muted">▼</span>
          </button>
          
          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="absolute left-0 mt-2 py-1.5 w-36 bg-white border border-light rounded-2xl shadow-lg z-50 animate-fade-in">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as LanguageCode);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-xs font-semibold hover:bg-light transition-colors"
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Mode Selector */}
        <div className="segmented-control p-1">
          {(['casual', 'work'] as ModeCode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`segmented-item px-4 py-1.5 text-xs font-bold rounded-full transition-all ${mode === m ? 'active' : ''}`}
            >
              {sel[m]}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="segmented-control p-1">
          {(['easy', 'medium', 'hard'] as DifficultyCode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`segmented-item px-4 py-1.5 text-xs font-bold rounded-full transition-all ${difficulty === d ? 'active' : ''}`}
            >
              {sel[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <TopicCard topic={currentTopic || t.generating} />
        
        <div className="w-full mb-12">
          <Timer key={topicKey} />
        </div>

        <div className="flex flex-col items-center w-full gap-4 px-4">
          {isCompletedToday ? (
            <>
              <div className="p-4 bg-light rounded-2xl border border-accent-light text-center w-full max-w-[320px]">
                <p className="text-xs font-bold text-accent uppercase mb-1 tracking-wider">{t.completeTitle}</p>
                <p className="text-sm text-muted">{t.completeBody}</p>
              </div>
              <button 
                className="text-sm font-bold text-main hover:opacity-70 transition-opacity" 
                onClick={() => setShowLogger(true)}
              >
                {t.editLog}
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-primary w-full shadow-lg shadow-accent/10" 
                style={{ maxWidth: '320px' }}
                onClick={() => setShowLogger(true)}
              >
                {t.completeLog}
              </button>
              <button 
                className="text-sm font-semibold text-muted hover:text-main transition-colors"
                onClick={generateTopic}
              >
                {t.tryDifferent}
              </button>
            </>
          )}
        </div>
      </div>

      {showLogger && (todaysTopics[topicKey] || isCompletedToday) && (
        <LoggerModal 
          topic={isCompletedToday ? (daySessions[lang]?.topic || '') : (todaysTopics[topicKey] as string)} 
          lang={lang}
          initialRating={isCompletedToday ? (daySessions[lang]?.rating || 'Good') : 'Good'}
          initialNote={isCompletedToday ? (daySessions[lang]?.note || '') : ''}
          onClose={() => setShowLogger(false)} 
          onLog={handleLog} 
        />
      )}
    </div>
  );
}
