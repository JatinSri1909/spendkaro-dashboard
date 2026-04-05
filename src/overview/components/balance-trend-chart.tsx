import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/common/components';
import type { MonthlyData } from '@/common/types';
import { formatCurrency } from '@/common/libs/finance';

interface BalanceTrendChartProps {
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

export function BalanceTrendChart({ data }: BalanceTrendChartProps) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Cash Flow</p>
          <p className="mt-0.5 text-sm font-semibold text-text">Income vs Expenses</p>
        </div>
        <span className="rounded-lg border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-text-muted">
          Jan – Jun 2025
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3DB88B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3DB88B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E85D75" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#E85D75" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            formatter={(value) => <span style={{ color: 'var(--color-text-muted)' }}>{value}</span>}
          />
          <Area type="monotone" dataKey="income" name="Income" stroke="#3DB88B" strokeWidth={2} fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4, fill: '#3DB88B' }} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#E85D75" strokeWidth={2} fill="url(#expenseGrad)" dot={false} activeDot={{ r: 4, fill: '#E85D75' }} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
