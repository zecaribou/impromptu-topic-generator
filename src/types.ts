export type LanguageCode = 'en' | 'cn' | 'fr' | 'es';
export type PracticeRating = 'Good' | 'Okay' | 'Struggled';
export type ModeCode = 'everyday' | 'work' | 'challenge';
export type DifficultyCode = 'easy' | 'medium' | 'hard';

export interface PracticeSession {
  date: string; // YYYY-MM-DD
  topic: string;
  rating?: PracticeRating;
  note?: string;
  language: LanguageCode;
  completedAt: string;
  mode?: ModeCode;
  difficulty?: DifficultyCode;
}

export type SessionsData = Record<string, Partial<Record<LanguageCode, PracticeSession>>>;

export interface StreakData {
  current: number;
  longest: number;
  lastDate: string | null;
  perLanguage?: Record<LanguageCode, { current: number; longest: number }>;
}
