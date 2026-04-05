import { SummaryCardItem, BalanceTrendChart, SpendingBreakdown, RecentTransactions, MonthlyBarChart } from './components';
import { useDashboard } from './hooks';
import { MonthChangeTypeEnum } from '@/common/types';

interface DashboardPageProps {
  onNavigateToTransactions: () => void;
}

export default function DashboardPage({ onNavigateToTransactions }: DashboardPageProps) {
  const { summary, monthlyData, categorySpend, transactions } = useDashboard();

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCardItem
          label="Total Balance"
          value={summary.balance}
          change={summary.balanceChange}
          icon={MonthChangeTypeEnum.Balance}
          subtitle="Cumulative net position"
        />
        <SummaryCardItem
          label="Total Income"
          value={summary.income}
          change={summary.incomeChange}
          icon={MonthChangeTypeEnum.Income}
          subtitle="All inflows this period"
        />
        <SummaryCardItem
          label="Total Expenses"
          value={summary.expenses}
          change={summary.expenseChange}
          icon={MonthChangeTypeEnum.Expense}
          subtitle="All outflows this period"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BalanceTrendChart data={monthlyData} />
        </div>
        <SpendingBreakdown data={categorySpend} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MonthlyBarChart data={monthlyData} />
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions} onViewAll={onNavigateToTransactions} />
        </div>
      </div>
    </div>
  );
}
