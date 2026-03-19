import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'prep' | 'speak3' | 'speak5'>('prep');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setSeconds(0); setIsActive(false); };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const target = mode === 'prep' ? 60 : mode === 'speak3' ? 180 : 300;
  const isOver = seconds >= target;

  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="mb-12">
        <div className="segmented-control">
          <button 
            className={`segmented-item ${mode === 'prep' ? 'active' : ''}`}
            onClick={() => { setMode('prep'); reset(); }}
          >
            1m Prep
          </button>
          <button 
            className={`segmented-item ${mode === 'speak3' ? 'active' : ''}`}
            onClick={() => { setMode('speak3'); reset(); }}
          >
            3m Speech
          </button>
          <button 
            className={`segmented-item ${mode === 'speak5' ? 'active' : ''}`}
            onClick={() => { setMode('speak5'); reset(); }}
          >
            5m Speech
          </button>
        </div>
      </div>
      
      <div className="mb-12">
        <span className={`text-4xl ${isOver ? 'text-muted' : 'text-main'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(seconds)}
        </span>
      </div>
      
      <div className="flex justify-center items-center gap-8">
        <button onClick={reset} className="text-muted p-2" aria-label="Reset Timer">
          <RotateCcw size={26} strokeWidth={1.5} />
        </button>
        <button onClick={toggle} className="text-main p-2" aria-label={isActive ? "Pause Timer" : "Play Timer"}>
          {isActive ? <Pause size={36} strokeWidth={1.5} fill="currentColor" /> : <Play size={36} strokeWidth={1.5} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
