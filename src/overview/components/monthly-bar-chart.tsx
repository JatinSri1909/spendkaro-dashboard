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
    <div className="glass-panel border-white/20! rounded-xl! p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{label}</p>
      <div className="flex flex-col gap-1.5">
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-bold tracking-wide drop-shadow-sm text-[#0EA5E9]">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    </div>
  );
}

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]">Monthly</p>
        <p className="mt-1 text-base font-bold tracking-wide text-text">Net Balance per Month</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Space Grotesk', fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Space Grotesk', fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar dataKey="balance" name="Net Balance" radius={[6, 6, 0, 0]} fill="url(#balanceGrad)">
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
