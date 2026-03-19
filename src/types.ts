export type PracticeRating = 'Good' | 'Okay' | 'Struggled';

export interface PracticeSession {
  date: string; // YYYY-MM-DD
  topic: string;
  rating?: PracticeRating;
  note?: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastDate: string | null;
}
