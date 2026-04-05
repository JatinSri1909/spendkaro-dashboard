import { useMemo } from 'react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum } from '@/common/types';
import {
  getMonthlyData,
  getCategorySpend,
  getTotalIncome,
  getTotalExpenses,
} from '@/common/libs/finance';

export function useInsights() {
  const { state } = useAppContext();
  const { transactions } = state;

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categorySpend = useMemo(() => getCategorySpend(transactions), [transactions]);

  const topCategory = categorySpend[0] ?? null;

  // Savings rate
  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(transactions), [transactions]);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Best and worst months
  const sortedByBalance = [...monthlyData].sort((a, b) => b.balance - a.balance);
  const bestMonth = sortedByBalance[0] ?? null;
  const worstMonth = sortedByBalance[sortedByBalance.length - 1] ?? null;

  // Average monthly spend
  const avgMonthlyExpense =
    monthlyData.length > 0
      ? monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length
      : 0;

  // Month over month comparison (last 2 months)
  const lastTwo = monthlyData.slice(-2);
  const momExpenseChange =
    lastTwo.length === 2 && lastTwo[0].expenses > 0
      ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100
      : 0;

  // Biggest single transaction
  const biggestExpense = [...transactions]
    .filter((t) => t.type === TransactionTypeEnum.Expense)
    .sort((a, b) => b.amount - a.amount)[0] ?? null;

  return {
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
  };
}
