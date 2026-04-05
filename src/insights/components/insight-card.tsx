import { Card } from '@/common/components';
import { insightCardAccentMap, insightCardTextMap } from '../constants';

interface InsightCardProps {
  emoji: string;
  title: string;
  value: string;
  subtitle: string;
  accent?: 'green' | 'red' | 'amber' | 'blue' | 'default';
}

export function InsightCard({ emoji, title, value, subtitle, accent = 'default' }: InsightCardProps) {
  return (
    <Card className={`p-5 ${insightCardAccentMap[accent]}`}>
      <div className="mb-3 text-2xl">{emoji}</div>
      <p className="text-xs font-medium uppercase tracking-widest text-text-muted">{title}</p>
      <p className={`mt-1 text-xl font-bold ${insightCardTextMap[accent]}`}>{value}</p>
      <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
    </Card>
  );
}
