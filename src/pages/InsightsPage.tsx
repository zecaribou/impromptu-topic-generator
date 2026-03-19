import { useLocalStorage } from '../hooks/useLocalStorage';
import type { PracticeSession, StreakData } from '../types';

export default function InsightsPage() {
  const [sessions] = useLocalStorage<Record<string, PracticeSession>>('sessions', {});
  const [streak] = useLocalStorage<StreakData>('streak', { current: 0, longest: 0, lastDate: null });

  const totalSessions = Object.keys(sessions).length;
  
  let completedLast30 = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (sessions[d.toLocaleDateString('en-CA')]) {
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
