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
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]">Spending</p>
        <p className="mt-1 text-base font-bold tracking-wide text-text">Category Breakdown</p>
      </div>
      <div className="flex flex-col gap-4">
        {data.slice(0, 8).map((item) => (
          <div key={item.category} className="group">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-semibold tracking-wide text-text">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-text-muted">{item.percentage.toFixed(1)}%</span>
                <span className="text-xs font-bold text-text tabular-nums w-20 text-right drop-shadow-sm">
                  {formatCurrencyFull(item.amount)}
                </span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-surface-border/40 overflow-hidden shadow-inner backdrop-blur-sm">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.2)]"
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