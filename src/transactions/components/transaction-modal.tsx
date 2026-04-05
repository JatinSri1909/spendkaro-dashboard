import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum, type Transaction, type TransactionCategory, type TransactionType } from '@/common/types';
import { AppActionType } from '@/common/constants';
import { transactionCategories } from '../constants';

interface TransactionModalProps {
  transaction?: Transaction;
  onClose: () => void;
}

function generateId(): string {
  return 't' + Date.now().toString(36);
}

export function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  const { dispatch } = useAppContext();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    merchant: transaction?.merchant ?? '',
    description: transaction?.description ?? '',
    amount: transaction ? String(transaction.amount) : '',
    type: (transaction?.type ?? TransactionTypeEnum.Expense) as TransactionType,
    category: (transaction?.category ?? 'Food & Dining') as TransactionCategory,
    date: transaction?.date ?? new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function validate(): boolean {
    const newErrors: Partial<typeof form> = {};
    if (!form.merchant.trim()) newErrors.merchant = 'Merchant is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid amount';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload: Transaction = {
      id: transaction?.id ?? generateId(),
      merchant: form.merchant.trim(),
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    };

    if (isEdit) {
      dispatch({ type: AppActionType.UpdateTransaction, payload });
    } else {
      dispatch({ type: AppActionType.AddTransaction, payload });
    }
    onClose();
  }

  function getTypeButtonClass(type: TransactionType): string {
    if (form.type !== type) {
      return 'text-text-muted hover:text-text';
    }

    if (type === TransactionTypeEnum.Income) {
      return 'bg-emerald-500/20 text-emerald-400';
    }

    return 'bg-rose-500/20 text-rose-400';
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/12 bg-surface-alt shadow-2xl animate-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h2 className="text-sm font-semibold text-text">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close transaction modal"
            title="Close"
            className="rounded-lg p-1.5 text-text-muted hover:bg-white/8 hover:text-text transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {/* Type toggle */}
          <div className="flex rounded-xl border border-white/10 bg-white/4 overflow-hidden">
            {([TransactionTypeEnum.Expense, TransactionTypeEnum.Income] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                title={t}
                className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${getTypeButtonClass(t)}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Merchant + Amount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="transaction-merchant" className="mb-1 block text-xs text-text-muted">Merchant *</label>
              <input
                id="transaction-merchant"
                type="text"
                value={form.merchant}
                onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
                placeholder="e.g. Swiggy"
                title="Merchant"
                className={inputClass}
              />
              {errors.merchant && <p className="mt-1 text-xs text-rose-400">{errors.merchant}</p>}
            </div>
            <div>
              <label htmlFor="transaction-amount" className="mb-1 block text-xs text-text-muted">Amount (₹) *</label>
              <input
                id="transaction-amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0"
                title="Amount"
                className={inputClass}
              />
              {errors.amount && <p className="mt-1 text-xs text-rose-400">{errors.amount}</p>}
            </div>
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="transaction-category" className="mb-1 block text-xs text-text-muted">Category</label>
              <select
                id="transaction-category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as TransactionCategory }))}
                title="Category"
                className={inputClass}
              >
                {transactionCategories
                  .filter((category): category is TransactionCategory => category !== 'all')
                  .map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="transaction-date" className="mb-1 block text-xs text-text-muted">Date *</label>
              <input
                id="transaction-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                title="Date"
                className={inputClass}
              />
              {errors.date && <p className="mt-1 text-xs text-rose-400">{errors.date}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="transaction-description" className="mb-1 block text-xs text-text-muted">Description</label>
            <input
              id="transaction-description"
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Optional note"
              title="Description"
              className={inputClass}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              title="Cancel"
              className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-text-muted hover:bg-white/6 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              title={isEdit ? 'Save changes' : 'Add transaction'}
              className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent/80 transition-colors shadow-lg shadow-accent/20"
            >
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
