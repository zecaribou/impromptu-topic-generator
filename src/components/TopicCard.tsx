export function TopicCard({ topic }: { topic: string }) {
  return (
    <div className="topic-section animate-fade-in">
      <h2 className="topic-label">Today's Topic</h2>
      <p className="topic-text">{topic || 'No topic generated'}</p>
      <p className="topic-hint">Speak for 3–5 minutes</p>
    </div>
  );
}
