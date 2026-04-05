import type { SortField, TransactionCategory } from '@/common/types';

export const transactionCategories: Array<TransactionCategory | 'all'> = [
  'all', 'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Health', 'Housing', 'Utilities', 'Income', 'Investments', 'Education', 'Travel', 'Other',
];

export const transactionSortOptions: Array<{ value: SortField; label: string }> = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Amount' },
  { value: 'category', label: 'Category' },
  { value: 'merchant', label: 'Merchant' },
];