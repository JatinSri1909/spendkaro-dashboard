import { InsightCard, MonthlyComparisonChart, CategoryBarChart } from './components';
import { useInsights } from './hooks';
import { formatCurrencyFull } from '@/common/libs/finance';
import { Trophy, PiggyBank, TrendingUp, TrendingDown, Activity, RefreshCw, AlertCircle, Scale, AlertTriangle, CheckCircle, TrendingUp as IncreaseIcon, Search, Lightbulb } from 'lucide-react';

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
          icon={Trophy}
          title="Top Spend Category"
          value={topCategory?.category ?? '-'}
          subtitle={topCategory ? `${formatCurrencyFull(topCategory.amount)} | ${topCategory.percentage.toFixed(1)}% of expenses` : 'No data'}
          accent="amber"
        />
        <InsightCard
          icon={PiggyBank}
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          subtitle={`Saved ${formatCurrencyFull(totalIncome - totalExpenses)} of ${formatCurrencyFull(totalIncome)} earned`}
          accent={savingsAccent}
        />
        <InsightCard
          icon={TrendingUp}
          title="Best Month"
          value={bestMonth?.month ?? '-'}
          subtitle={bestMonth ? `Net +${formatCurrencyFull(bestMonth.balance)}` : 'No data'}
          accent="green"
        />
        <InsightCard
          icon={TrendingDown}
          title="Tightest Month"
          value={worstMonth?.month ?? '-'}
          subtitle={worstMonth ? `Net ${formatCurrencyFull(worstMonth.balance)}` : 'No data'}
          accent="red"
        />
      </div>

      {/* Second row of insights */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InsightCard
          icon={Activity}
          title="Avg Monthly Spend"
          value={formatCurrencyFull(avgMonthlyExpense)}
          subtitle="Average across all months"
          accent="blue"
        />
        <InsightCard
          icon={RefreshCw}
          title="MoM Expense Change"
          value={`${momExpenseChange >= 0 ? '+' : ''}${momExpenseChange.toFixed(1)}%`}
          subtitle="vs previous month"
          accent={momExpenseChange <= 0 ? 'green' : 'red'}
        />
        <InsightCard
          icon={AlertCircle}
          title="Biggest Expense"
          value={biggestExpense ? formatCurrencyFull(biggestExpense.amount) : '-'}
          subtitle={biggestExpense ? `${biggestExpense.merchant} | ${biggestExpense.category}` : 'No data'}
          accent="amber"
        />
        <InsightCard
          icon={Scale}
          title="Expense Ratio"
          value={totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(0)}%` : '-'}
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
            <div className="flex items-start gap-3 rounded-xl border border-rose-500/15 bg-rose-500/8 px-4 py-2.5 text-xs text-rose-700 dark:text-rose-300 font-medium">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-700 dark:text-rose-400" />
              <p>Your savings rate is below 10%. Consider cutting back on <strong>{topCategory?.category}</strong>.</p>
            </div>
          )}
          {savingsRate >= 20 && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/8 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
              <p>Great job! Your savings rate of {savingsRate.toFixed(1)}% is above the recommended 20%.</p>
            </div>
          )}
          {momExpenseChange > 15 && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/15 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-300 font-medium">
              <IncreaseIcon className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <p>Your spending increased by {momExpenseChange.toFixed(1)}% last month. Keep an eye on {topCategory?.category}.</p>
            </div>
          )}
          {topCategory && topCategory.percentage > 30 && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/15 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-300 font-medium">
              <Search className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <p><strong>{topCategory.category}</strong> accounts for {topCategory.percentage.toFixed(0)}% of your spending - consider setting a budget.</p>
            </div>
          )}
          <div className="flex items-start gap-3 rounded-xl border border-black/10 dark:border-white/8 bg-black/5 dark:bg-white/4 px-4 py-2.5 text-xs text-text-muted">
            <Lightbulb className="h-4 w-4 shrink-0 text-text-muted" />
            <p>Your highest single expense was <strong className="text-text">{biggestExpense?.merchant}</strong> at <strong className="text-text">{biggestExpense ? formatCurrencyFull(biggestExpense.amount) : '-'}</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
