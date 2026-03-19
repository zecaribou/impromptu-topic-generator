export function TopicCard({ topic }: { topic: string }) {
  return (
    <div className="text-center mb-12 animate-fade-in mt-12">
      <h2 className="text-xs text-muted font-semibold mb-4 uppercase">Today's Topic</h2>
      <p className="text-3xl font-medium mb-6 px-4">{topic || 'No topic generated'}</p>
      <p className="text-sm text-muted">Speak for 3–5 minutes</p>
    </div>
  );
}
