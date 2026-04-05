import { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/common/components';
import { TransactionTypeEnum, RoleEnum, type Transaction, type Role } from '@/common/types';
import { formatCurrencyFull } from '@/common/libs/finance';
import { CATEGORY_COLORS, BadgeVariant } from '@/common/constants';

interface TransactionTableProps {
  transactions: Transaction[];
  role: Role;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionTable({ transactions, role, onEdit, onDelete }: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevTransactions, setPrevTransactions] = useState(transactions);
  const itemsPerPage = 10;

  if (transactions !== prevTransactions) {
    setPrevTransactions(transactions);
    setCurrentPage(1);
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 text-4xl">🔍</div>
        <p className="text-sm font-medium text-text">No transactions found</p>
        <p className="mt-1 text-xs text-text-muted">Try adjusting your filters</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(transactions.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const currentTransactions = transactions.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {['Date', 'Merchant', 'Category', 'Type', 'Amount', ...(role === RoleEnum.Admin ? ['Actions'] : [])].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((txn) => (
              <tr
                key={txn.id}
              className="group border-b border-white/5 transition-colors hover:bg-white/3"
            >
              <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                    style={{ backgroundColor: CATEGORY_COLORS[txn.category] + '22', color: CATEGORY_COLORS[txn.category] }}
                  >
                    {txn.merchant.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text">{txn.merchant}</p>
                    {txn.description && (
                      <p className="truncate text-xs text-text-muted">{txn.description}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge label={txn.category} color={CATEGORY_COLORS[txn.category]} />
              </td>
              <td className="px-4 py-3">
                <Badge
                  label={txn.type}
                  variant={txn.type === TransactionTypeEnum.Income ? BadgeVariant.Income : BadgeVariant.Expense}
                />
              </td>
              <td className="px-4 py-3">
                <span
                  className={`font-semibold tabular-nums ${
                    txn.type === TransactionTypeEnum.Income ? 'text-emerald-400' : 'text-red-500'
                  }`}
                >
                  {txn.type === TransactionTypeEnum.Income ? '+' : '-'}{formatCurrencyFull(txn.amount)}
                </span>
              </td>
              {role === RoleEnum.Admin && (
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onEdit(txn)}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-white/10 hover:text-accent transition-colors"
                      aria-label={`Edit ${txn.merchant} transaction`}
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(txn.id)}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-rose-500/15 hover:text-rose-400 transition-colors"
                      aria-label={`Delete ${txn.merchant} transaction`}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
          <p className="text-xs text-text-muted">
            Showing {(safePage - 1) * itemsPerPage + 1} to {Math.min(safePage * itemsPerPage, transactions.length)} of {transactions.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="rounded-lg p-1 text-text-muted hover:bg-white/10 hover:text-text disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 text-xs font-medium text-text">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="rounded-lg p-1 text-text-muted hover:bg-white/10 hover:text-text disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
