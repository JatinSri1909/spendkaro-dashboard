import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/common/components';
import type { MonthlyData } from '@/common/types';
import { formatCurrency } from '@/common/libs/finance';

interface MonthlyBarChartProps {
  data: MonthlyData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
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

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Monthly</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Net Balance per Month</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="balance" name="Net Balance" radius={[6, 6, 0, 0]}
            fill="url(#balanceGrad)"
          >
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A96E" />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
