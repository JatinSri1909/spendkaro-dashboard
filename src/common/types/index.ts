export enum RoleEnum {
  Viewer = 'viewer',
  Admin = 'admin',
}

export type Role = RoleEnum;

export enum TransactionTypeEnum {
  Income = 'income',
  Expense = 'expense',
}

export enum MonthChangeTypeEnum {
  Income = 'income',
  Expense = 'expense',
  Balance = 'balance',
}

export type TransactionCategory =
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Housing'
  | 'Utilities'
  | 'Income'
  | 'Investments'
  | 'Education'
  | 'Travel'
  | 'Other';

export type TransactionType = TransactionTypeEnum;
export type MonthChangeType = MonthChangeTypeEnum;

export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
  merchant: string;
}

export interface SummaryCard {
  label: string;
  value: number;
  change: number; // percentage change vs last month
  changeLabel: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategorySpend {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  color: string;
}

export type SortField = 'date' | 'amount' | 'category' | 'merchant';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: TransactionCategory | 'all';
  dateFrom: string;
  dateTo: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export type Theme = 'light' | 'dark';
