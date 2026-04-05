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
    <div className="glass-panel !border-white/20 !rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{label}</p>
      <div className="flex flex-col gap-1.5">
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-bold tracking-wide drop-shadow-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    </div>
  );
}

export function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]">Comparison</p>
        <p className="mt-1 text-base font-bold tracking-wide text-text">Monthly Income vs Expenses</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={16} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Space Grotesk', fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Space Grotesk', fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px', fontFamily: 'Space Grotesk', fontWeight: 600 }} formatter={(v) => <span className="text-text-muted hover:text-text transition-colors">{v}</span>} />
          <Bar dataKey="income" name="Income" fill="#38BDF8" radius={[4, 4, 0, 0]} opacity={0.8} />
          <Bar dataKey="expenses" name="Expenses" fill="#818CF8" radius={[4, 4, 0, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
