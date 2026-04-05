import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum, type Transaction, type TransactionCategory, type TransactionType } from '@/common/types';
import { AppActionType } from '@/common/constants';
import { transactionCategories } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker } from '@/common/components';

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
      return 'text-text-muted hover:text-text border border-transparent';
    }

    if (type === TransactionTypeEnum.Income) {
      return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    }

    return 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
  }

  const inputClass = "w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface/40 px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:bg-surface/60 focus:outline-none transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] backdrop-blur-xl";

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 transition-opacity bg-black/60 dark:bg-[#020617]/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="glass-panel relative w-full max-w-md max-h-[90vh] overflow-y-auto !rounded-2xl !p-0 shadow-[0_16px_60px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-6 py-5 bg-white/50 dark:bg-white/[0.02]">
          <h2 className="text-sm font-bold tracking-widest uppercase text-accent drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]">
            {isEdit ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close transaction modal"
            title="Close"
            className="rounded-full p-2 text-text-muted hover:bg-white/10 hover:text-text transition-all hover:rotate-90 hover:scale-110"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          {/* Type toggle */}
          <div className="flex rounded-xl border border-white/10 bg-surface/30 backdrop-blur-xl p-1.5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]">
            {([TransactionTypeEnum.Expense, TransactionTypeEnum.Income] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                title={t}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${getTypeButtonClass(t)}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Merchant + Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label htmlFor="transaction-merchant" className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Merchant *</label>
              <input
                id="transaction-merchant"
                type="text"
                value={form.merchant}
                onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
                placeholder="e.g. Swiggy"
                title="Merchant"
                className={inputClass}
              />
              {errors.merchant && <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 drop-shadow-sm">{errors.merchant}</p>}
            </div>
            <div className="group">
              <label htmlFor="transaction-amount" className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Amount (₹) *</label>
              <input
                id="transaction-amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0"
                title="Amount"
                className={inputClass}
                step="0.01"
              />
              {errors.amount && <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 drop-shadow-sm">{errors.amount}</p>}
            </div>
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Category</label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm((f) => ({ ...f, category: value as TransactionCategory }))}
              >
                <SelectTrigger className="h-[3.25rem] px-4 py-3">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {transactionCategories
                    .filter((category): category is TransactionCategory => category !== 'all')
                    .map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="group">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Date *</label>
              <DatePicker 
                date={form.date ? new Date(form.date) : undefined}
                onDateChange={(date: Date | undefined) => { setForm(f => ({ ...f, date: date ? date.toISOString().split('T')[0] : '' })) }}
              />
              {errors.date && <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 drop-shadow-sm">{errors.date}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="group">
            <label htmlFor="transaction-description" className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Description</label>
            <input
              id="transaction-description"
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Optional note about this transaction"
              title="Description"
              className={inputClass}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-3 mt-2 border-t border-black/10 dark:border-white/5">
            <button
              type="button"
              onClick={onClose}
              title="Cancel"
              className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-3 text-xs font-bold uppercase tracking-widest text-text-muted hover:bg-black/10 dark:hover:bg-white/10 hover:text-text transition-all backdrop-blur-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              title={isEdit ? 'Save changes' : 'Add transaction'}
              className="flex-1 rounded-xl bg-accent/90 border border-accent/50 py-3 text-xs font-bold uppercase tracking-widest text-slate-950 hover:bg-accent hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-md"
            >
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}