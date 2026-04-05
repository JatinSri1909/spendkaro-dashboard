import { InsightCard, MonthlyComparisonChart, CategoryBarChart } from './components';
import { useInsights } from './hooks';
import { formatCurrencyFull } from '@/common/libs/finance';

export default function InsightsPage() {
  const {
    monthlyData,
    categorySpend,
    topCategory,
    savingsRate,
    bestMonth,
    worstMonth,
    avgMonthlyExpense,
    momExpenseChange,
    biggestExpense,
    totalIncome,
    totalExpenses,
  } = useInsights();

  let savingsAccent: 'green' | 'amber' | 'red' = 'red';
  if (savingsRate >= 20) {
    savingsAccent = 'green';
  } else if (savingsRate >= 10) {
    savingsAccent = 'amber';
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      {/* Header */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Analytics</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Financial Insights</p>
      </div>

      {/* Key Insight Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InsightCard
          emoji="🏆"
          title="Top Spend Category"
          value={topCategory?.category ?? '—'}
          subtitle={topCategory ? `${formatCurrencyFull(topCategory.amount)} · ${topCategory.percentage.toFixed(1)}% of expenses` : 'No data'}
          accent="amber"
        />
        <InsightCard
          emoji="💰"
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          subtitle={`Saved ${formatCurrencyFull(totalIncome - totalExpenses)} of ${formatCurrencyFull(totalIncome)} earned`}
          accent={savingsAccent}
        />
        <InsightCard
          emoji="📈"
          title="Best Month"
          value={bestMonth?.month ?? '—'}
          subtitle={bestMonth ? `Net +${formatCurrencyFull(bestMonth.balance)}` : 'No data'}
          accent="green"
        />
        <InsightCard
          emoji="📉"
          title="Tightest Month"
          value={worstMonth?.month ?? '—'}
          subtitle={worstMonth ? `Net ${formatCurrencyFull(worstMonth.balance)}` : 'No data'}
          accent="red"
        />
      </div>

      {/* Second row of insights */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InsightCard
          emoji="📊"
          title="Avg Monthly Spend"
          value={formatCurrencyFull(avgMonthlyExpense)}
          subtitle="Average across all months"
          accent="blue"
        />
        <InsightCard
          emoji="🔄"
          title="MoM Expense Change"
          value={`${momExpenseChange >= 0 ? '+' : ''}${momExpenseChange.toFixed(1)}%`}
          subtitle="vs previous month"
          accent={momExpenseChange <= 0 ? 'green' : 'red'}
        />
        <InsightCard
          emoji="💸"
          title="Biggest Expense"
          value={biggestExpense ? formatCurrencyFull(biggestExpense.amount) : '—'}
          subtitle={biggestExpense ? `${biggestExpense.merchant} · ${biggestExpense.category}` : 'No data'}
          accent="amber"
        />
        <InsightCard
          emoji="⚖️"
          title="Expense Ratio"
          value={totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(0)}%` : '—'}
          subtitle="Expenses as % of income"
          accent={totalExpenses / totalIncome < 0.7 ? 'green' : 'red'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MonthlyComparisonChart data={monthlyData} />
        <CategoryBarChart data={categorySpend} />
      </div>

      {/* Observations */}
      <div className="rounded-2xl border border-white/8 bg-surface p-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">Observations</p>
        <div className="flex flex-col gap-2">
          {savingsRate < 10 && (
            <p className="rounded-xl border border-rose-500/15 bg-rose-500/8 px-4 py-2.5 text-xs text-rose-300">
              ⚠️ Your savings rate is below 10%. Consider cutting back on <strong>{topCategory?.category}</strong>.
            </p>
          )}
          {savingsRate >= 20 && (
            <p className="rounded-xl border border-emerald-500/15 bg-emerald-500/8 px-4 py-2.5 text-xs text-emerald-300">
              ✅ Great job! Your savings rate of {savingsRate.toFixed(1)}% is above the recommended 20%.
            </p>
          )}
          {momExpenseChange > 15 && (
            <p className="rounded-xl border border-amber-500/15 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-300">
              📊 Your spending increased by {momExpenseChange.toFixed(1)}% last month. Keep an eye on {topCategory?.category}.
            </p>
          )}
          {topCategory && topCategory.percentage > 30 && (
            <p className="rounded-xl border border-amber-500/15 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-300">
              🔍 <strong>{topCategory.category}</strong> accounts for {topCategory.percentage.toFixed(0)}% of your spending — consider setting a budget.
            </p>
          )}
          <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-xs text-text-muted">
            💡 Your highest single expense was <strong className="text-text">{biggestExpense?.merchant}</strong> at{' '}
            <strong className="text-text">{biggestExpense ? formatCurrencyFull(biggestExpense.amount) : '—'}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
