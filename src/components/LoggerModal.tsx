import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { PracticeRating, LanguageCode } from '../types';

interface Props {
  topic: string;
  lang?: LanguageCode;
  initialRating?: PracticeRating;
  initialNote?: string;
  onClose: () => void;
  onLog: (rating: PracticeRating, note: string) => void;
}

const TRANSLATIONS: Record<LanguageCode, {
  title: string;
  ratings: Record<PracticeRating, string>;
  placeholder: string;
  cancel: string;
  save: string;
}> = {
  en: {
    title: 'Log Check-in',
    ratings: { Good: 'Good', Okay: 'Okay', Struggled: 'Struggled' },
    placeholder: 'Reflection or takeaway (optional)...',
    cancel: 'Cancel',
    save: 'Save'
  },
  cn: {
    title: '记录本次练习',
    ratings: { Good: '流畅', Okay: '一般', Struggled: '吃力' },
    placeholder: '练习心得或收获（选填）...',
    cancel: '取消',
    save: '保存'
  },
  fr: {
    title: 'Enregistrer la session',
    ratings: { Good: 'Fluide', Okay: 'Moyen', Struggled: 'Difficile' },
    placeholder: 'Réflexion ou note (optionnel)...',
    cancel: 'Annuler',
    save: 'Sauvegarder'
  },
  es: {
    title: 'Registrar Práctica',
    ratings: { Good: 'Fluido', Okay: 'Regular', Struggled: 'Difícil' },
    placeholder: 'Reflexión o aprendizaje (opcional)...',
    cancel: 'Cancelar',
    save: 'Guardar'
  }
};

export function LoggerModal({ topic, lang = 'en', initialRating = 'Good', initialNote = '', onClose, onLog }: Props) {
  const [rating, setRating] = useState<PracticeRating>(initialRating);
  const [note, setNote] = useState(initialNote);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return createPortal(
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 animate-fade-in" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div 
        className="bg-white w-full sm:w-auto sm:min-w-[400px] rounded-t-3xl sm:rounded-3xl p-6 shadow-lg" 
        style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom))' }}
      >
        <h2 className="text-xl font-semibold mb-2 text-center">{t.title}</h2>
        <p className="text-sm text-muted mb-6 text-center px-4">"{topic}"</p>
        
        <div className="mb-6">
          <div className="segmented-control w-full flex">
            {(['Good', 'Okay', 'Struggled'] as PracticeRating[]).map((r) => (
              <button 
                key={r}
                onClick={() => setRating(r)}
                className={`flex-1 segmented-item text-center py-2 ${rating === r ? 'active' : ''}`}
                style={{ fontSize: '0.95rem' }}
              >
                {t.ratings[r]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-4 rounded-lg bg-light"
            style={{ minHeight: '80px', fontSize: '1rem', outline: 'none', border: 'none', resize: 'none' }}
            placeholder={t.placeholder}
          />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 text-muted font-medium py-3 text-center" onClick={onClose}>{t.cancel}</button>
          <button className="flex-1 bg-accent text-white rounded-full font-medium py-3 text-center" onClick={() => onLog(rating, note)}>{t.save}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
