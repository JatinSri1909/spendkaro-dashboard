import { Card } from '@/common/components';
import type { CategorySpend } from '@/common/types';
import { formatCurrencyFull } from '@/common/libs/finance';

interface CategoryBarChartProps {
  data: CategorySpend[];
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  const max = data[0]?.amount ?? 1;

  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Spending</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Category Breakdown</p>
      </div>
      <div className="flex flex-col gap-3">
        {data.slice(0, 8).map((item) => (
          <div key={item.category}>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-text">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">{item.percentage.toFixed(1)}%</span>
                <span className="text-xs font-semibold text-text tabular-nums w-20 text-right">
                  {formatCurrencyFull(item.amount)}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(item.amount / max) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
