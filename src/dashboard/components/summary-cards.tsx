import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/common/components';
import { formatCurrencyFull } from '@/common/libs/finance';
import { summaryCardAccentMap, summaryCardIconMap } from '../constants';
import { MonthChangeTypeEnum } from '@/common/types';

interface SummaryCardProps {
  label: string;
  value: number;
  change: number;
  icon: MonthChangeTypeEnum;
  subtitle?: string;
}

export function SummaryCardItem({ label, value, change, icon, subtitle }: SummaryCardProps) {
  const Icon = summaryCardIconMap[icon];
  const accent = summaryCardAccentMap[icon];
  const isPositive = change >= 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accent}`}>
          <Icon size={18} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400'
          }`}
        >
          {isPositive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-text">
          {formatCurrencyFull(value)}
        </p>
        {subtitle && <p className="mt-0.5 text-xs text-text-muted">{subtitle}</p>}
      </div>
    </Card>
  );
}
