import { useState } from 'react';
import type { PracticeRating } from '../types';

interface Props {
  topic: string;
  initialRating?: PracticeRating;
  initialNote?: string;
  onClose: () => void;
  onLog: (rating: PracticeRating, note: string) => void;
}

export function LoggerModal({ topic, initialRating = 'Good', initialNote = '', onClose, onLog }: Props) {
  const [rating, setRating] = useState<PracticeRating>(initialRating);
  const [note, setNote] = useState(initialNote);

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 animate-fade-in" style={{ background: 'rgba(0,0,0,0.4)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="bg-white w-full sm:w-auto sm:min-w-[400px] rounded-t-3xl sm:rounded-3xl p-6 shadow-lg pb-12 sm:pb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Log Check-in</h2>
        <p className="text-sm text-muted mb-8 text-center px-4">"{topic}"</p>
        
        <div className="mb-8">
          <div className="segmented-control w-full flex">
            {(['Good', 'Okay', 'Struggled'] as PracticeRating[]).map((r) => (
              <button 
                key={r}
                onClick={() => setRating(r)}
                className={`flex-1 segmented-item text-center py-3 ${rating === r ? 'active' : ''}`}
                style={{ fontSize: '1rem' }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-4 rounded-lg bg-light"
            style={{ minHeight: '100px', fontSize: '1rem', outline: 'none', border: 'none', resize: 'none' }}
            placeholder="Reflection or takeaway (optional)..."
          />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 text-muted font-medium py-4 text-center" onClick={onClose}>Cancel</button>
          <button className="flex-1 bg-accent text-white rounded-full font-medium py-4 text-center" onClick={() => onLog(rating, note)}>Save</button>
        </div>
      </div>
    </div>
  );
}
