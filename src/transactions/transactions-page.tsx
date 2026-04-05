import { useState, lazy, Suspense } from 'react';
import { Download, Plus } from 'lucide-react';
import { Card } from '@/common/components';
import { TransactionFilters, TransactionTable } from './components';
import { useTransactions } from './hooks';
import { RoleEnum, type Transaction } from '@/common/types';

const TransactionModal = lazy(() =>
  import('./components/transaction-modal').then((m) => ({ default: m.TransactionModal }))
);

export default function TransactionsPage() {
  const { filtered, role, deleteTransaction, exportCSV, exportJSON } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [showExportMenu, setShowExportMenu] = useState(false);

  function openAdd() {
    setEditingTransaction(undefined);
    setModalOpen(true);
  }

  function openEdit(t: Transaction) {
    setEditingTransaction(t);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTransaction(undefined);
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">Manage</p>
          <p className="text-sm font-semibold text-text">{filtered.length} transactions</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Export */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowExportMenu((v) => !v)}
              title="Export transactions"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-xs font-medium text-text-muted hover:bg-white/12 hover:text-text transition-colors"
            >
              <Download size={13} /> Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-10 z-20 flex flex-col rounded-xl border border-white/12 bg-surface-alt shadow-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => { exportCSV(); setShowExportMenu(false); }}
                  title="Export as CSV"
                  className="px-4 py-2.5 text-left text-xs text-text hover:bg-white/8 transition-colors"
                >
                  Export as CSV
                </button>
                <button
                  type="button"
                  onClick={() => { exportJSON(); setShowExportMenu(false); }}
                  title="Export as JSON"
                  className="px-4 py-2.5 text-left text-xs text-text hover:bg-white/8 transition-colors"
                >
                  Export as JSON
                </button>
              </div>
            )}
          </div>

          {/* Add button (admin only) */}
          {role === RoleEnum.Admin && (
            <button
              type="button"
              onClick={openAdd}
              title="Add transaction"
              className="flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-xs font-bold text-white hover:bg-accent/80 transition-colors shadow-lg shadow-accent/20"
            >
              <Plus size={13} />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      {/* Role info banner for viewer */}
      {role === RoleEnum.Viewer && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
          👁 Viewer mode — switch to Admin to add, edit, or delete transactions.
        </div>
      )}

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <Card>
        <TransactionTable
          transactions={filtered}
          role={role}
          onEdit={openEdit}
          onDelete={deleteTransaction}
        />
      </Card>

      {/* Modal */}
      {modalOpen && (
        <Suspense fallback={null}>
          <TransactionModal transaction={editingTransaction} onClose={closeModal} />
        </Suspense>
      )}
    </div>
  );
}
