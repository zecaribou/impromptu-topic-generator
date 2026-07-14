import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StreakData, PracticeRating, SessionsData, LanguageCode, ModeCode, DifficultyCode } from '../types';
import { calculateStreaks } from '../utils/streaks';
import { TOPICS } from '../data/topics';
import { TopicCard } from '../components/TopicCard';
import { Timer } from '../components/Timer';
import { LoggerModal } from '../components/LoggerModal';
import { ChevronDown } from 'lucide-react';

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
    <div className="animate-fade-in pt-4 w-full">
      <div className="max-w-2xl mx-auto w-full">
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
      <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto px-4">
        <h1 className="practice-headline">
          {t.headline}
        </h1>
        <p className="practice-subheadline">
          {t.subheadline}
        </p>
        <p className="practice-mode-desc">
          {mode === 'work' ? t.workDesc : t.casualDesc}
        </p>
      </div>

      {/* Control Bar */}
      <div className="control-bar px-4">
        {/* Language Dropdown */}
        <div className="dropdown-container">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`dropdown-trigger ${isLangOpen ? 'open' : ''}`}
          >
            <span className="flex items-center gap-2">
              <span>{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
            </span>
            <span className="dropdown-trigger-chevron">
              <ChevronDown size={14} strokeWidth={2.5} />
            </span>
          </button>
          
          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="dropdown-menu animate-fade-in">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as LanguageCode);
                      setIsLangOpen(false);
                    }}
                    className={`dropdown-item ${l.code === lang ? 'selected' : ''}`}
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
        <div className="custom-segmented">
          {(['casual', 'work'] as ModeCode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`custom-segmented-item ${mode === m ? 'active' : ''}`}
            >
              {sel[m]}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="custom-segmented">
          {(['easy', 'medium', 'hard'] as DifficultyCode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`custom-segmented-item ${difficulty === d ? 'active' : ''}`}
            >
              {sel[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <TopicCard topic={currentTopic || t.generating} />
        
        <div className="w-full">
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
      </div>

      {/* Speech Insights Section */}
      <section className="insights-section">
        <div className="coming-soon-badge">Coming soon</div>
        <h2 className="insights-title">
          Your personalized feedback for every speech you do here
        </h2>
        <p className="insights-subtitle">
          Record your practice and receive clear, practical feedback on your clarity, confidence, structure, delivery and speaking habits.
        </p>

        {/* Mock Analytics Dashboard */}
        <div className="insights-dashboard">
          {/* Transcript Preview Card */}
          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Transcript Preview</span>
            </div>
            <p className="transcript-text">
              “<span className="h-tag h-unclear" title="Sentence structure could be more concise">
                <span className="h-tag h-hedging" title="Hedging language makes points sound less decisive">I think</span> the main reason people struggle with public speaking is not because they have nothing to say, but because they are trying to sound perfect.<span className="h-label h-label-unclear">Long Sentence</span><span className="h-label h-label-hedging">Hedging</span>
              </span>{" "}
              <span className="h-tag h-filler" title="Filler word / transition hedge">Maybe</span> the better approach is to focus on{" "}
              <span className="h-tag h-strong" title="Strong confident phrasing">being clear, structured and present</span>.<span className="h-label h-label-filler">Filler</span><span className="h-label h-label-strong">Strong</span>”
            </p>
          </div>

          {/* Speech Metrics Card */}
          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Speech Metrics</span>
            </div>
            <div className="metrics-row">
              <div className="metric-box">
                <span className="metric-val">2:14</span>
                <span className="metric-lbl">Duration</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">138</span>
                <span className="metric-lbl">WPM</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">7</span>
                <span className="metric-lbl">Filler Words</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">4.2s</span>
                <span className="metric-lbl">Longest Pause</span>
              </div>
            </div>
          </div>

          {/* Feedback Scores Cards */}
          <div className="scores-grid">
            {/* Clarity */}
            <div className="dashboard-card">
              <div className="score-card-header">
                <span className="score-card-title">Clarity</span>
                <span className="score-card-value">82</span>
              </div>
              <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ width: '82%' }} />
              </div>
              <p className="score-card-desc">
                Your opening is strong, but the middle section could be more focused.
              </p>
            </div>

            {/* Confidence */}
            <div className="dashboard-card">
              <div className="score-card-header">
                <span className="score-card-title">Confidence</span>
                <span className="score-card-value">68</span>
              </div>
              <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ width: '68%', backgroundColor: '#ff9500' }} />
              </div>
              <p className="score-card-desc">
                Hedging phrases like “I think” and “maybe” make your point sound less decisive.
              </p>
            </div>

            {/* Structure */}
            <div className="dashboard-card">
              <div className="score-card-header">
                <span className="score-card-title">Structure</span>
                <span className="score-card-value">76</span>
              </div>
              <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ width: '76%' }} />
              </div>
              <p className="score-card-desc">
                Your main point is clear, but your examples need a stronger sequence.
              </p>
            </div>

            {/* Delivery */}
            <div className="dashboard-card">
              <div className="score-card-header">
                <span className="score-card-title">Delivery</span>
                <span className="score-card-value">73</span>
              </div>
              <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ width: '73%' }} />
              </div>
              <p className="score-card-desc">
                Your pace is engaging, although some transitions feel slightly rushed.
              </p>
            </div>
          </div>

          {/* Personalised Feedback Cards */}
          <div className="feedback-grid">
            {/* What you did well */}
            <div className="dashboard-card fb-card well">
              <div className="fb-card-title well">What you did well</div>
              <p className="fb-card-desc">
                You introduced the topic clearly and used a relatable example.
              </p>
            </div>

            {/* Room for improvement */}
            <div className="dashboard-card fb-card improvement">
              <div className="fb-card-title improvement">Biggest room for improvement</div>
              <p className="fb-card-desc">
                Make your conclusion more direct. End with one clear takeaway instead of trailing off.
              </p>
            </div>
          </div>

          {/* Next Practice Recommendation */}
          <div className="dashboard-card rec-card">
            <div className="rec-title">Next practice</div>
            <p className="rec-desc">
              Try a 1-minute answer where you make one point, give one example, and end with a clear takeaway.
            </p>
          </div>
        </div>

        {/* Benefits Highlights Section */}
        <div className="features-section">
          <div className="features-grid">
            <div className="feat-card">
              <h3 className="feat-title">Understand your speaking habits</h3>
              <p className="feat-desc">
                Spot filler words, repeated phrases and rushed transitions.
              </p>
            </div>
            <div className="feat-card">
              <h3 className="feat-title">Improve your structure</h3>
              <p className="feat-desc">
                See whether your answer has a clear opening, middle and takeaway.
              </p>
            </div>
            <div className="feat-card">
              <h3 className="feat-title">Build confidence over time</h3>
              <p className="feat-desc">
                Track clarity, confidence and delivery as you practise.
              </p>
            </div>
          </div>
        </div>

        {/* Early Access CTA Block */}
        <div className="cta-block">
          <h2 className="cta-title">Want personalised feedback on your speech?</h2>
          <p className="cta-body">
            Analyse your delivery, identify filler words, improve your structure, and receive practical recommendations after every practice.
          </p>
          <a
            href="https://form.typeform.com/to/HHn3xfrg"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Sign up for early access
          </a>
          <span className="cta-supporting">
            Be the first to access SpeechLab’s personalised speech analytics.
          </span>
        </div>
      </section>

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

