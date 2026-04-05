import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/common/components';
import type { CategorySpend } from '@/common/types';
import { formatCurrency } from '@/common/libs/finance';

interface SpendingBreakdownProps {
  data: CategorySpend[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: CategorySpend }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/12 bg-surface-alt px-4 py-3 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
        <p className="text-sm font-semibold text-text">{item.category}</p>
      </div>
      <p className="mt-1 text-xs text-text-muted">{formatCurrency(item.amount)} · {item.percentage.toFixed(1)}%</p>
    </div>
  );
}

export function SpendingBreakdown({ data }: SpendingBreakdownProps) {
  const top5 = data.slice(0, 6);

  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Breakdown</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Spending by Category</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={top5}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                dataKey="amount"
              >
                {top5.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {top5.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="flex-1 truncate text-xs text-text-muted">{item.category}</span>
              <span className="text-xs font-semibold text-text">{item.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
