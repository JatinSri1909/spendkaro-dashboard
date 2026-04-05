import React from 'react';
import { Card, CardContent } from '@/common/components';
import { insightCardAccentMap, insightCardTextMap } from '../constants';

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  accent?: 'green' | 'red' | 'amber' | 'blue' | 'default';
}

export function InsightCard({ icon: Icon, title, value, subtitle, accent = 'default' }: InsightCardProps) {
  return (
    <Card className={`overflow-hidden ${insightCardAccentMap[accent] || ''}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted">{title}</p>
          <div className={`p-2 rounded-full bg-surface-alt/50 border border-surface-border ${insightCardTextMap[accent]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className={`text-2xl font-bold ${insightCardTextMap[accent]}`}>{value}</p>
        <p className="mt-1.5 text-xs text-text-muted font-medium">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
