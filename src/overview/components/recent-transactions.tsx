import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/common/components';
import { TransactionTypeEnum, type Transaction } from '@/common/types';
import { formatCurrencyFull } from '@/common/libs/finance';
import { CATEGORY_COLORS } from '@/common/constants';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export function RecentTransactions({ transactions, onViewAll }: RecentTransactionsProps) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Latest</p>
          <p className="mt-0.5 text-sm font-semibold text-text">Recent Transactions</p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          title="View all transactions"
          className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-white/12 hover:text-text"
        >
          View all <ArrowUpRight size={11} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/4"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: CATEGORY_COLORS[txn.category] + '33', color: CATEGORY_COLORS[txn.category] }}
            >
              {txn.merchant.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-text">{txn.merchant}</p>
              <p className="truncate text-xs text-text-muted">{txn.category}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  txn.type === TransactionTypeEnum.Income ? 'text-emerald-400' : 'text-red-500'
                }`}
              >
                {txn.type === TransactionTypeEnum.Income ? '+' : '-'}{formatCurrencyFull(txn.amount)}
              </p>
              <p className="text-xs text-text-muted">
                {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
