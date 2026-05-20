import { useNavigate } from 'react-router-dom';
import { Globe, Brain, Activity } from 'lucide-react';

const LANGUAGES = [
  { 
    code: 'en', 
    label: 'English', 
    sub: 'Practice articulation & structured speaking',
    flag: '🇬🇧',
    color: '#007AFF'
  },
  { 
    code: 'cn', 
    label: '中文', 
    sub: '练习表达与即兴表达',
    flag: '🇨🇳',
    color: '#FF9500'
  },
  { 
    code: 'fr', 
    label: 'Français', 
    sub: 'Travaillez votre expression orale',
    flag: '🇫🇷',
    color: '#5856D6'
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in hero-section">
      <div className="flex flex-col items-center w-full">
        <h1 className="hero-title">
          Practice thinking out loud.
        </h1>
        <p className="hero-subtitle text-center text-muted max-w-[340px] mt-4">
          Choose your practice language to begin a focused session.
        </p>
      </div>

      <div className="modules-grid mt-12">
        {LANGUAGES.map((lang) => (
          <div 
            key={lang.code}
            onClick={() => navigate(`/practice/${lang.code}`)}
            className="module-card active group"
            style={{ '--lang-color': lang.color } as any}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-3xl">{lang.flag}</span>
              <Globe size={20} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <h2 className="module-title" style={{ color: 'var(--text-main)' }}>{lang.label}</h2>
            <p className="module-desc">
              {lang.sub}
            </p>
            <div className="module-footer">
              <span className="module-cta" style={{ color: lang.color }}>
                Start session <span>&rarr;</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="modules-grid mt-8">
        {/* Future Card 1 */}
        <div className="module-card disabled">
          <h2 className="module-title text-muted flex items-center gap-2">
            <Brain size={18} /> Vocal Warmup
          </h2>
          <p className="module-desc">
            Prepare your voice with AI-guided exercises and breathwork routines.
          </p>
          <div className="module-footer">
            <span className="module-status">Coming soon</span>
          </div>
        </div>

        {/* Future Card 2 */}
        <div className="module-card disabled">
          <h2 className="module-title text-muted flex items-center gap-2">
            <Activity size={18} /> Delivery Analytics
          </h2>
          <p className="module-desc">
            Record your sessions to detect filler words, pacing, and tone automatically.
          </p>
          <div className="module-footer">
            <span className="module-status">In development</span>
          </div>
        </div>
      </div>

      <div className="hero-quote-container mt-16 opacity-50">
        <p className="hero-quote text-sm text-center">
          “Great speakers are not born, they're trained.”
          <span className="block mt-1 font-semibold">— Dale Carnegie</span>
        </p>
      </div>
    </div>
  );
}
