import type { PracticeSession, StreakData } from '../types';

function parseDateStr(str: string) {
  const [y, m, d] = str.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

export function calculateStreaks(sessions: Record<string, PracticeSession>): StreakData {
  const dates = Object.keys(sessions).sort();
  if (dates.length === 0) return { current: 0, longest: 0, lastDate: null };

  const todayStr = new Date().toLocaleDateString('en-CA');
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterdayStr = d.toLocaleDateString('en-CA');

  let longestStreak = 0;
  let tempStreak = 1;
  
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      longestStreak = 1;
      continue;
    }
    const current = parseDateStr(dates[i]);
    const prev = parseDateStr(dates[i - 1]);
    const diffTime = Math.abs(current.getTime() - prev.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 1) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else if (diffDays > 1) {
      tempStreak = 1;
    }
  }

  let activeStreak = 0;
  let checkDate = new Date();
  
  if (sessions[todayStr]) {
     checkDate = new Date();
  } else if (sessions[yesterdayStr]) {
     checkDate = new Date();
     checkDate.setDate(checkDate.getDate() - 1);
  } else {
     return { current: 0, longest: longestStreak, lastDate: dates[dates.length - 1] };
  }

  while (true) {
    const checkStr = checkDate.toLocaleDateString('en-CA');
    if (sessions[checkStr]) {
      activeStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { current: activeStreak, longest: longestStreak, lastDate: dates[dates.length - 1] };
}
