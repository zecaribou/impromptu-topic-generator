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
    everydayDesc: "For conversation, personal stories, opinions and general speaking confidence.",
    workDesc: "For realistic professional communication.",
    challengeDesc: "For creativity, persuasion and faster thinking.",
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
    everydayDesc: "用于日常对话、个人故事、观点表达以及提升整体口语自信。",
    workDesc: "用于真实的职场沟通与交流。",
    challengeDesc: "用于锻炼创造力、说服力和快速反应能力。",
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
    everydayDesc: "Para conversación, historias personales, opiniones y confianza al hablar en general.",
    workDesc: "Para comunicación profesional realista.",
    challengeDesc: "Para creatividad, persuasión y pensamiento rápido.",
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
    everydayDesc: "Pour la conversation, les histoires personnelles, les opinions et la confiance générale à l'oral.",
    workDesc: "Pour une communication professionnelle réaliste.",
    challengeDesc: "Pour la créativité, la persuasion et une réflexion rapide.",
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
    everyday: 'Everyday',
    work: 'Work',
    challenge: 'Challenge',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  },
  cn: {
    everyday: '日常',
    work: '工作',
    challenge: '挑战',
    easy: '简单',
    medium: '中等',
    hard: '困难'
  },
  es: {
    everyday: 'Diario',
    work: 'Profesional',
    challenge: 'Desafío',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil'
  },
  fr: {
    everyday: 'Quotidien',
    work: 'Professionnel',
    challenge: 'Défi',
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

const MODE_TYPES: Record<'everyday' | 'work' | 'challenge', string[]> = {
  everyday: ['Mixed', 'Conversation', 'Personal Stories', 'Opinions', 'Explain It Simply'],
  work: ['Mixed', 'Interview', 'Meetings', 'Presentations', 'Pitching', 'Leadership'],
  challenge: ['Mixed', 'Persuade', 'Debate', 'Defend a Bad Idea', 'Creative Scenario', 'Hot Take']
};

export default function PracticePage() {
  const [lang, setLang] = useLocalStorage<LanguageCode>('selectedLanguage', 'en');
  const [storedMode, setMode] = useLocalStorage<ModeCode>('selectedMode', 'everyday');
  const [difficulty, setDifficulty] = useLocalStorage<DifficultyCode>('selectedDifficulty', 'easy');
  const [topicType, setTopicType] = useLocalStorage<string>('selectedTopicType', 'Mixed');
  
  const [sessions, setSessions] = useLocalStorage<SessionsData>('sessions', {});
  const [streak, setStreak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });
  const [todaysTopics, setTodaysTopics] = useLocalStorage<Record<string, string>>('todaysTopics', {});
  const [topicHistory, setTopicHistory] = useLocalStorage<Record<string, string[]>>('speechlab_topic_history', {});
  const [showLogger, setShowLogger] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Safeguard mode to handle legacy 'casual' values
  const mode = (storedMode === 'everyday' || storedMode === 'work' || storedMode === 'challenge') ? storedMode : 'everyday';

  const today = new Date().toLocaleDateString('en-CA');
  const daySessions = sessions[today] || {};
  const isCompletedToday = !!daySessions[lang];

  const topicKey = `${lang}-${mode}-${difficulty}-${topicType}`;
  const t = COPY[lang] || COPY.en;
  const sel = SELECTOR_LABELS[lang] || SELECTOR_LABELS.en;
  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Reset topicType to Mixed when switching modes
  useEffect(() => {
    setTopicType('Mixed');
  }, [mode, setTopicType]);

  // Topic generation logic
  const generateTopic = (forceNew = false) => {
    const pool = TOPICS[lang]?.[mode]?.[difficulty] || [];
    const filteredPool = topicType === 'Mixed'
      ? pool
      : pool.filter(t => t.type === topicType);

    if (filteredPool.length === 0) return;

    const historyKey = `${lang}-${mode}-${difficulty}-${topicType}`;
    const seenForThisFilter = topicHistory[historyKey] || [];

    const existingTopic = todaysTopics[topicKey];
    if (!forceNew && existingTopic && (existingTopic === '__EXHAUSTED__' || filteredPool.some(t => t.text === existingTopic))) {
      return;
    }

    const available = filteredPool.filter(t => !seenForThisFilter.includes(t.text));

    if (available.length === 0) {
      setTodaysTopics(prev => ({
        ...prev,
        [topicKey]: "__EXHAUSTED__"
      }));
      return;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const selectedTopic = available[randomIndex];

    // Save to history
    const updatedHistory = {
      ...topicHistory,
      [historyKey]: [...seenForThisFilter, selectedTopic.text]
    };
    setTopicHistory(updatedHistory);

    setTodaysTopics(prev => ({
      ...prev,
      [topicKey]: selectedTopic.text
    }));
  };

  // Ensure a topic exists on load or configuration change
  useEffect(() => {
    if (!isCompletedToday) {
      generateTopic(false);
    }
  }, [lang, mode, difficulty, topicType, isCompletedToday]);

  const handleLog = (rating: PracticeRating, note: string) => {
    const topic = todaysTopics[topicKey];
    if (!topic || topic === '__EXHAUSTED__') return;
    
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

  const resetCategoryHistory = () => {
    const historyKey = `${lang}-${mode}-${difficulty}-${topicType}`;
    const updatedHistory = { ...topicHistory };
    updatedHistory[historyKey] = [];
    setTopicHistory(updatedHistory);

    setTodaysTopics(prev => {
      const next = { ...prev };
      delete next[topicKey];
      return next;
    });
  };

  const resetAllHistory = () => {
    if (window.confirm("Are you sure you want to reset all topic history? This cannot be undone.")) {
      setTopicHistory({});
      setTodaysTopics({});
    }
  };

  const currentTopic = isCompletedToday 
    ? (daySessions[lang]?.topic || '') 
    : (todaysTopics[topicKey] || '');

  const typesForMode = MODE_TYPES[mode] || [];

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
          {mode === 'everyday' ? t.everydayDesc : mode === 'work' ? t.workDesc : t.challengeDesc}
        </p>
      </div>

      {/* Control Bar */}
      <div className="control-bar px-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
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
          {(['everyday', 'work', 'challenge'] as ModeCode[]).map((m) => (
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

        {/* Topic Type Dropdown */}
        <div className="dropdown-container">
          <button
            onClick={() => setIsTypeOpen(!isTypeOpen)}
            className={`dropdown-trigger ${isTypeOpen ? 'open' : ''}`}
            style={{ minWidth: '160px' }}
          >
            <span className="flex items-center gap-2">
              <span className="text-muted text-xs uppercase tracking-wider font-semibold mr-1">Type:</span>
              <span>{topicType}</span>
            </span>
            <span className="dropdown-trigger-chevron">
              <ChevronDown size={14} strokeWidth={2.5} />
            </span>
          </button>
          
          {isTypeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsTypeOpen(false)} />
              <div className="dropdown-menu animate-fade-in" style={{ width: '190px' }}>
                {typesForMode.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTopicType(t);
                      setIsTypeOpen(false);
                    }}
                    className={`dropdown-item ${t === topicType ? 'selected' : ''}`}
                  >
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        {currentTopic === '__EXHAUSTED__' ? (
          <div className="topic-section animate-fade-in px-4 text-center" style={{ minHeight: '120px' }}>
            <h2 className="topic-label">All Topics Completed</h2>
            <p className="topic-text text-base font-semibold my-4">
              You've completed all topics in this pool!
            </p>
            <button 
              className="btn-primary py-2 px-6 text-sm"
              onClick={resetCategoryHistory}
              style={{ padding: '10px 24px', fontSize: '0.875rem' }}
            >
              Reset Category History
            </button>
          </div>
        ) : (
          <TopicCard topic={currentTopic || t.generating} />
        )}
        
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
              {currentTopic !== '__EXHAUSTED__' && (
                <button 
                  className="btn-primary w-full shadow-lg shadow-accent/10" 
                  style={{ maxWidth: '320px' }}
                  onClick={() => setShowLogger(true)}
                >
                  {t.completeLog}
                </button>
              )}
              {currentTopic !== '__EXHAUSTED__' && (
                <button 
                  className="text-sm font-semibold text-muted hover:text-main transition-colors"
                  onClick={() => generateTopic(true)}
                >
                  {t.tryDifferent}
                </button>
              )}
              
              <button
                className="text-xs text-muted hover:text-main transition-colors mt-2"
                onClick={resetAllHistory}
              >
                Reset all topic history
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

