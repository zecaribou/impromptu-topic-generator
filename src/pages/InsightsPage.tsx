import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StreakData, SessionsData } from '../types';

export default function InsightsPage() {
  const [sessions] = useLocalStorage<SessionsData>('sessions', {});
  const [streak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });

  // Sum all language sessions across all days
  const totalSessions = Object.values(sessions).reduce((acc, dayLogs) => {
    return acc + (dayLogs ? Object.keys(dayLogs).length : 0);
  }, 0);
  
  let completedLast30 = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayLogs = sessions[d.toLocaleDateString('en-CA')];
    if (dayLogs && Object.keys(dayLogs).length > 0) {
      completedLast30++;
    }
  }
  const consistency = Math.round((completedLast30 / 30) * 100);

  return (
    <div className="animate-fade-in pt-4 pb-8">
      <h1 className="text-xl font-semibold mb-12">Insights</h1>
      
      <div className="flex flex-col gap-12 mt-8">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-medium mb-2">{streak.current}</span>
          <span className="text-xs text-muted uppercase font-semibold tracking-wide">Current Streak</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-4xl font-medium mb-2">{streak.longest}</span>
          <span className="text-xs text-muted uppercase font-semibold tracking-wide">Longest Streak</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl font-medium mb-2">{totalSessions}</span>
          <span className="text-xs text-muted uppercase font-semibold tracking-wide">Total Practices</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-4xl font-medium mb-2">{consistency}%</span>
          <span className="text-xs text-muted uppercase font-semibold tracking-wide">30-Day Consistency</span>
        </div>
      </div>
      
      <div className="mt-16 text-center text-sm text-muted font-medium">
        Keep showing up. Every day counts.
      </div>
    </div>
  );
}
