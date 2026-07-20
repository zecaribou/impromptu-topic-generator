import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { LanguageCode } from '../types';

interface TimerProps {
  lang?: LanguageCode;
}

const TIMER_LABELS: Record<LanguageCode, {
  prep: string;
  speak: string;
  preset3: string;
  preset5: string;
  resetLabel: string;
  playLabel: string;
  pauseLabel: string;
}> = {
  en: {
    prep: "Preparation",
    speak: "Speaking",
    preset3: "3m Preset",
    preset5: "5m Preset",
    resetLabel: "Reset Timer",
    playLabel: "Play Timer",
    pauseLabel: "Pause Timer"
  },
  cn: {
    prep: "准备时间",
    speak: "演讲时间",
    preset3: "3分钟预设",
    preset5: "5分钟预设",
    resetLabel: "重置计时",
    playLabel: "启动计时",
    pauseLabel: "暂停计时"
  },
  es: {
    prep: "Preparación",
    speak: "Discurso",
    preset3: "Predet. 3m",
    preset5: "Predet. 5m",
    resetLabel: "Reiniciar",
    playLabel: "Iniciar",
    pauseLabel: "Pausar"
  },
  fr: {
    prep: "Préparation",
    speak: "Prise de parole",
    preset3: "3 min prédéfini",
    preset5: "5 min prédéfini",
    resetLabel: "Réinitialiser",
    playLabel: "Démarrer",
    pauseLabel: "Pause"
  }
};

export function Timer({ lang = 'en' }: TimerProps) {
  const [timerMode, setTimerMode] = useState<'prep' | 'speak'>('prep');
  const [prepDuration, setPrepDuration] = useState(60); // 1 minute default
  const [speakDuration, setSpeakDuration] = useState(180); // 3 minutes default

  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  const tl = TIMER_LABELS[lang] || TIMER_LABELS.en;

  // Sync remaining seconds when duration settings or mode change while timer is inactive
  useEffect(() => {
    if (!isActive) {
      const activeDuration = timerMode === 'prep' ? prepDuration : speakDuration;
      setRemainingSeconds(activeDuration);
      setTotalSeconds(activeDuration);
    }
  }, [timerMode, prepDuration, speakDuration, isActive]);

  // Robust, system-timestamp-delta based tick logic for background tab accuracy
  useEffect(() => {
    if (!isActive) return;

    const targetTime = Date.now() + remainingSeconds * 1000;

    const interval = setInterval(() => {
      const delta = targetTime - Date.now();
      const nextRemaining = Math.max(0, Math.ceil(delta / 1000));
      
      setRemainingSeconds(nextRemaining);

      if (nextRemaining <= 0) {
        setIsActive(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    const activeDuration = timerMode === 'prep' ? prepDuration : speakDuration;
    setRemainingSeconds(activeDuration);
    setTotalSeconds(activeDuration);
  };

  const adjustDuration = (amount: number) => {
    // If timer is running, pause and reset it to new adjusted value
    setIsActive(false);

    if (timerMode === 'prep') {
      setPrepDuration((prev) => {
        const next = Math.max(0, Math.min(600, prev + amount));
        setRemainingSeconds(next);
        setTotalSeconds(next);
        return next;
      });
    } else {
      setSpeakDuration((prev) => {
        const next = Math.max(0, Math.min(600, prev + amount));
        setRemainingSeconds(next);
        setTotalSeconds(next);
        return next;
      });
    }
  };

  const setSpeakingPreset = (seconds: number) => {
    setIsActive(false);
    setSpeakDuration(seconds);
    setRemainingSeconds(seconds);
    setTotalSeconds(seconds);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Circular progress calculations
  const radius = 85;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // 534.07
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 1;
  const strokeDashoffset = circumference * (1 - progress);

  const isFinalTen = remainingSeconds > 0 && remainingSeconds <= 10;
  
  // Muted coral/orange for emphasis in the last 10 seconds, dark gray (var(--accent)) otherwise
  const ringColor = isFinalTen ? '#e05638' : 'var(--accent)';
  const textColor = isFinalTen ? '#e05638' : 'var(--text-main)';

  return (
    <div className="timer-section animate-fade-in flex flex-col items-center">
      
      {/* Mode switcher (Prep vs Speaking) */}
      <div className="timer-control-wrapper mb-6">
        <div className="segmented-control">
          <button 
            className={`segmented-item ${timerMode === 'prep' ? 'active' : ''}`}
            onClick={() => { setTimerMode('prep'); reset(); }}
          >
            {tl.prep}
          </button>
          <button 
            className={`segmented-item ${timerMode === 'speak' ? 'active' : ''}`}
            onClick={() => { setTimerMode('speak'); reset(); }}
          >
            {tl.speak}
          </button>
        </div>
      </div>

      {/* SVG Circular Ring and Numbers */}
      <div className="relative-timer-container">
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
          />
          {/* Animated remaining ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth={isFinalTen ? strokeWidth + 1.5 : strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: isActive ? 'stroke-dashoffset 0.1s linear, stroke-width 0.2s ease, stroke 0.3s ease' : 'stroke-dashoffset 0.3s ease, stroke 0.3s ease'
            }}
          />
        </svg>
        <div className="absolute-timer-content">
          <span className="timer-label">
            {timerMode === 'prep' ? tl.prep : tl.speak}
          </span>
          <span 
            className="timer-digits-circle" 
            style={{ color: textColor, transition: 'color 0.3s ease' }}
          >
            {formatTime(remainingSeconds)}
          </span>
        </div>
      </div>

      {/* Play / Pause / Reset Control Buttons */}
      <div className="flex justify-center items-center gap-8 mb-6">
        <button onClick={reset} className="text-muted p-2 hover:text-main transition-colors" aria-label={tl.resetLabel}>
          <RotateCcw size={22} strokeWidth={2} />
        </button>
        <button 
          onClick={toggle} 
          className="p-2 hover:opacity-85 transition-opacity" 
          style={{ color: ringColor, transition: 'color 0.3s ease' }}
          aria-label={isActive ? tl.pauseLabel : tl.playLabel}
        >
          {isActive ? (
            <Pause size={38} strokeWidth={2} fill="currentColor" />
          ) : (
            <Play size={38} strokeWidth={2} fill="currentColor" />
          )}
        </button>
      </div>

      {/* Adjuster controls & presets */}
      <div className="flex flex-col items-center gap-3">
        {timerMode === 'prep' ? (
          <div className="flex items-center gap-4">
            <button className="timer-adj-btn" onClick={() => adjustDuration(-30)}>-30s</button>
            <span className="timer-dur-val">{formatTime(prepDuration)}</span>
            <button className="timer-adj-btn" onClick={() => adjustDuration(30)}>+30s</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <button 
                className={`timer-preset-btn ${speakDuration === 180 ? 'active' : ''}`}
                onClick={() => setSpeakingPreset(180)}
              >
                {tl.preset3}
              </button>
              <button 
                className={`timer-preset-btn ${speakDuration === 300 ? 'active' : ''}`}
                onClick={() => setSpeakingPreset(300)}
              >
                {tl.preset5}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="timer-adj-btn" onClick={() => adjustDuration(-30)}>-30s</button>
              <span className="timer-dur-val">{formatTime(speakDuration)}</span>
              <button className="timer-adj-btn" onClick={() => adjustDuration(30)}>+30s</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
