import { Search, X, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum, type TransactionCategory, type TransactionType, type SortField } from '@/common/types';
import { AppActionType } from '@/common/constants';
import { transactionCategories, transactionSortOptions } from '../constants';

export function TransactionFilters() {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' ||
    filters.dateFrom || filters.dateTo;

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Search + Sort */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search merchant, category, description..."
            aria-label="Search transactions"
            title="Search transactions"
            value={filters.search}
            onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { search: e.target.value } })}
            className="w-full rounded-xl border border-white/10 bg-surface pl-9 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-text-muted" />
          <select
            value={filters.sortField}
            onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { sortField: e.target.value as SortField } })}
            aria-label="Sort field"
            title="Sort field"
            className="rounded-xl border border-white/10 bg-surface px-3 py-2.5 text-sm text-text focus:border-accent/50 focus:outline-none"
          >
            {transactionSortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => dispatch({ type: AppActionType.SetFilter, payload: { sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' } })}
            aria-label={filters.sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
            title={filters.sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
            className="rounded-xl border border-white/10 bg-surface px-3 py-2.5 text-sm text-text-muted hover:text-text transition-colors"
          >
            {filters.sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Row 2: Type + Category + Date range + Reset */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Type */}
        <div className="flex rounded-xl border border-white/10 bg-surface overflow-hidden">
          {(['all', TransactionTypeEnum.Income, TransactionTypeEnum.Expense] as Array<TransactionType | 'all'>).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => dispatch({ type: AppActionType.SetFilter, payload: { type: t } })}
              title={t === 'all' ? 'All transaction types' : t}
              className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filters.type === t
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {t === 'all' ? 'All' : t}
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { category: e.target.value as TransactionCategory | 'all' } })}
          aria-label="Transaction category filter"
          title="Transaction category filter"
          className="rounded-xl border border-white/10 bg-surface px-3 py-1.5 text-xs text-text focus:border-accent/50 focus:outline-none"
        >
          {transactionCategories.map((c) => (
            <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
          ))}
        </select>

        {/* Date range */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { dateFrom: e.target.value } })}
          aria-label="From date"
          title="From date"
          className="rounded-xl border border-white/10 bg-surface px-3 py-1.5 text-xs text-text focus:border-accent/50 focus:outline-none"
        />
        <span className="text-xs text-text-muted">to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { dateTo: e.target.value } })}
          aria-label="To date"
          title="To date"
          className="rounded-xl border border-white/10 bg-surface px-3 py-1.5 text-xs text-text focus:border-accent/50 focus:outline-none"
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => dispatch({ type: AppActionType.ResetFilters })}
            title="Reset filters"
            className="flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
