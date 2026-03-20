import { useNavigate } from 'react-router-dom';
import { Mic2, Brain, Activity } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in hero-section">
      <div className="flex flex-col items-center w-full">
        <h1 className="hero-title">
          Master your speaking.
        </h1>
        <div className="hero-quote-container">
          <p className="hero-quote">
            “Great speakers are not born, they're trained.”
          </p>
          <p className="hero-author">
            — Dale Carnegie
          </p>
        </div>
      </div>

      <div className="modules-grid">
        
        {/* Active Card */}
        <div 
          onClick={() => navigate('/impromptu')}
          className="module-card active"
        >
          <div className="module-icon active">
            <Mic2 size={22} />
          </div>
          <h2 className="module-title" style={{ color: 'var(--text-main)' }}>Impromptu Generator</h2>
          <p className="module-desc">
            Practice thinking on your feet with daily speaking prompts, built-in timing, and progress tracking.
          </p>
          <div className="module-footer">
            <span className="module-cta">
              Start practicing <span>&rarr;</span>
            </span>
          </div>
        </div>

        {/* Future Card 1 */}
        <div className="module-card disabled">
          <div className="module-icon disabled">
            <Brain size={22} />
          </div>
          <h2 className="module-title text-muted">Vocal Warmup</h2>
          <p className="module-desc">
            Prepare your voice with AI-guided exercises and breathwork routines.
          </p>
          <div className="module-footer">
            <span className="module-status">
              Coming soon
            </span>
          </div>
        </div>

        {/* Future Card 2 */}
        <div className="module-card disabled">
          <div className="module-icon disabled">
            <Activity size={22} />
          </div>
          <h2 className="module-title text-muted">Delivery Analytics</h2>
          <p className="module-desc">
            Record your sessions to detect filler words, pacing, and tone automatically.
          </p>
          <div className="module-footer">
            <span className="module-status">
              In development
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
