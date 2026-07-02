import type { StreakData, SessionsData, LanguageCode } from '../types';

function parseDateStr(str: string) {
  const [y, m, d] = str.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

function calculateBasicStreak(dates: string[]): { current: number; longest: number } {
  if (dates.length === 0) return { current: 0, longest: 0 };
  
  const sortedDates = [...dates].sort();
  const todayStr = new Date().toLocaleDateString('en-CA');
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterdayStr = d.toLocaleDateString('en-CA');

  let longestStreak = 0;
  let tempStreak = 1;
  
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      longestStreak = 1;
      continue;
    }
    const current = parseDateStr(sortedDates[i]);
    const prev = parseDateStr(sortedDates[i - 1]);
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
  const dateSet = new Set(sortedDates);
  
  if (dateSet.has(todayStr)) {
     checkDate = new Date();
  } else if (dateSet.has(yesterdayStr)) {
     checkDate = new Date();
     checkDate.setDate(checkDate.getDate() - 1);
  } else {
     return { current: 0, longest: longestStreak };
  }

  while (true) {
    const checkStr = checkDate.toLocaleDateString('en-CA');
    if (dateSet.has(checkStr)) {
      activeStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { current: activeStreak, longest: longestStreak };
}

export function calculateStreaks(sessions: SessionsData): StreakData {
  const allDates = Object.keys(sessions);
  const mainStreak = calculateBasicStreak(allDates);
  const lastDate = allDates.length > 0 ? [...allDates].sort()[allDates.length - 1] : null;

  const perLanguage: Record<LanguageCode, { current: number; longest: number }> = {
    en: { current: 0, longest: 0 },
    cn: { current: 0, longest: 0 },
    fr: { current: 0, longest: 0 },
    es: { current: 0, longest: 0 }
  };

  const languages: LanguageCode[] = ['en', 'cn', 'fr', 'es'];
  languages.forEach(lang => {
    const langDates = allDates.filter(date => sessions[date] && sessions[date][lang]);
    perLanguage[lang] = calculateBasicStreak(langDates);
  });

  return {
    ...mainStreak,
    lastDate,
    perLanguage
  };
}
