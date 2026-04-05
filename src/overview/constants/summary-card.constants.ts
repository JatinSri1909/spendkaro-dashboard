import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { MonthChangeTypeEnum } from '@/common/types';

export const summaryCardIconMap: Record<MonthChangeTypeEnum, typeof Wallet> = {
  [MonthChangeTypeEnum.Balance]: Wallet,
  [MonthChangeTypeEnum.Income]: TrendingUp,
  [MonthChangeTypeEnum.Expense]: TrendingDown,
};

export const summaryCardAccentMap: Record<MonthChangeTypeEnum, string> = {
  [MonthChangeTypeEnum.Balance]: 'text-accent border-accent/20 bg-accent/10',
  [MonthChangeTypeEnum.Income]: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  [MonthChangeTypeEnum.Expense]: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
};