import { useMemo } from 'react';
import { useAppContext } from '@/common/hooks';
import { MonthChangeTypeEnum } from '@/common/types';
import {
  getMonthlyData,
  getCategorySpend,
  getTotalBalance,
  getTotalIncome,
  getTotalExpenses,
  getMonthChange,
} from '@/common/libs/finance';

export function useDashboard() {
  const { state } = useAppContext();
  const { transactions } = state;

  const summary = useMemo(
    () => ({
      balance: getTotalBalance(transactions),
      income: getTotalIncome(transactions),
      expenses: getTotalExpenses(transactions),
      balanceChange: getMonthChange(transactions, MonthChangeTypeEnum.Balance),
      incomeChange: getMonthChange(transactions, MonthChangeTypeEnum.Income),
      expenseChange: getMonthChange(transactions, MonthChangeTypeEnum.Expense),
    }),
    [transactions]
  );

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categorySpend = useMemo(() => getCategorySpend(transactions), [transactions]);

  return { summary, monthlyData, categorySpend, transactions };
}
