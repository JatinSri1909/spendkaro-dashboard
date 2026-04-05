import { MonthChangeTypeEnum, TransactionTypeEnum, type Transaction, type MonthlyData, type CategorySpend, type TransactionCategory, type MonthChangeType } from '../types';
import { CATEGORY_COLORS } from '../constants';

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toFixed(0)}`;
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthMap = new Map<string, { income: number; expenses: number }>();

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = monthMap.get(key) ?? { income: 0, expenses: 0 };
    if (t.type === TransactionTypeEnum.Income) {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
    monthMap.set(key, existing);
  });

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, data]) => {
      const [year, month] = key.split('-');
      const date = new Date(Number(year), Number(month) - 1);
      return {
        month: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses,
      };
    });
}

export function getCategorySpend(transactions: Transaction[]): CategorySpend[] {
  const expenses = transactions.filter((t) => t.type === TransactionTypeEnum.Expense);
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  const catMap = new Map<TransactionCategory, number>();

  expenses.forEach((t) => {
    catMap.set(t.category, (catMap.get(t.category) ?? 0) + t.amount);
  });

  return Array.from(catMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: CATEGORY_COLORS[category],
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce(
    (sum, t) => (t.type === TransactionTypeEnum.Income ? sum + t.amount : sum - t.amount),
    0
  );
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === TransactionTypeEnum.Income)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === TransactionTypeEnum.Expense)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getMonthChange(transactions: Transaction[], type: MonthChangeType): number {
  const now = new Date();
  const thisMonth = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonth = transactions.filter((t) => {
    const d = new Date(t.date);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1);
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
  });

  const calc = (txns: Transaction[]) => {
    if (type === MonthChangeTypeEnum.Income) return getTotalIncome(txns);
    if (type === MonthChangeTypeEnum.Expense) return getTotalExpenses(txns);
    return getTotalBalance(txns);
  };

  const curr = calc(thisMonth);
  const prev = calc(lastMonth);
  if (prev === 0) return 0;
  return ((curr - prev) / prev) * 100;
}
