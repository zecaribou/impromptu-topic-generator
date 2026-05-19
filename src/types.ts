export type LanguageCode = 'en' | 'cn' | 'fr';
export type PracticeRating = 'Good' | 'Okay' | 'Struggled';

export interface PracticeSession {
  date: string; // YYYY-MM-DD
  topic: string;
  rating?: PracticeRating;
  note?: string;
  language: LanguageCode;
  completedAt: string;
}

export type SessionsData = Record<string, Partial<Record<LanguageCode, PracticeSession>>>;

export interface StreakData {
  current: number;
  longest: number;
  lastDate: string | null;
  perLanguage?: Record<LanguageCode, { current: number; longest: number }>;
}
