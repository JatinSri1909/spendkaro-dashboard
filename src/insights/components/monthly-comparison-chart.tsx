import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Card } from '@/common/components';
import type { MonthlyData } from '@/common/types';
import { formatCurrency } from '@/common/libs/finance';

interface MonthlyComparisonChartProps {
  data: MonthlyData[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/12 bg-surface-alt px-4 py-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Comparison</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Monthly Income vs Expenses</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={14} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} formatter={(v) => <span style={{ color: 'var(--color-text-muted)' }}>{v}</span>} />
          <Bar dataKey="income" name="Income" fill="#3DB88B" radius={[4, 4, 0, 0]} opacity={0.85} />
          <Bar dataKey="expenses" name="Expenses" fill="#E85D75" radius={[4, 4, 0, 0]} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
