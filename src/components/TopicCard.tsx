interface TopicCardProps {
  topic: string;
  labelTodayTopic: string;
  labelSpeakHint: string;
}

export function TopicCard({ topic, labelTodayTopic, labelSpeakHint }: TopicCardProps) {
  return (
    <div className="topic-section animate-fade-in">
      <h2 className="topic-label">{labelTodayTopic}</h2>
      <p className="topic-text">{topic || 'No topic generated'}</p>
      <p className="topic-hint">{labelSpeakHint}</p>
    </div>
  );
}
