import { useNavigate } from 'react-router-dom';
import { Mic2, Brain, Activity } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in py-8 sm:py-16 text-center">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-tight" style={{ letterSpacing: '-0.04em' }}>
          Master your speaking.
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto font-medium" style={{ lineHeight: 1.5 }}>
          A sleek, modular suite designed to help you organize thoughts, practice delivery, and track progress effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
        <div 
          onClick={() => navigate('/impromptu')}
          className="bg-white rounded-3xl p-8 shadow-sm border cursor-pointer hover:shadow-md transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mb-6">
            <Mic2 size={24} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Impromptu Generator</h2>
          <p className="text-muted font-medium mb-6">
            Think on your feet with randomized topics, built-in timers, and daily tracking.
          </p>
          <button className="text-accent font-semibold flex items-center gap-1">
            Start Practicing &rarr;
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border opacity-60 relative cursor-not-allowed">
          <div className="absolute top-8 right-8 text-xs font-bold uppercase tracking-wide px-3 py-1 bg-light rounded-full text-muted">
            Coming Soon
          </div>
          <div className="w-12 h-12 rounded-2xl bg-light text-muted flex items-center justify-center mb-6">
            <Brain size={24} />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-muted">Vocal Warmup</h2>
          <p className="text-muted font-medium mb-6">
            Prepare your voice with AI-guided exercises and breathwork routines.
          </p>
          <span className="text-muted font-semibold flex items-center gap-1">
            In Development
          </span>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border opacity-60 relative cursor-not-allowed">
          <div className="absolute top-8 right-8 text-xs font-bold uppercase tracking-wide px-3 py-1 bg-light rounded-full text-muted">
            Coming Soon
          </div>
          <div className="w-12 h-12 rounded-2xl bg-light text-muted flex items-center justify-center mb-6">
            <Activity size={24} />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-muted">Delivery Analytics</h2>
          <p className="text-muted font-medium mb-6">
            Record your sessions to detect filler words, pacing, and tone automatically.
          </p>
          <span className="text-muted font-semibold flex items-center gap-1">
            In Development
          </span>
        </div>
      </div>
    </div>
  );
}
