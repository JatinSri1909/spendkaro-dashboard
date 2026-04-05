import { Search, X, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum, type TransactionCategory, type TransactionType, type SortField } from '@/common/types';
import { AppActionType } from '@/common/constants';
import { transactionCategories, transactionSortOptions } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker } from '@/common/components';

export function TransactionFilters() {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' ||
    filters.dateFrom || filters.dateTo;

  const inputClass = "rounded-xl border border-white/10 bg-surface/40 px-3 py-2.5 text-sm text-text focus:border-accent/50 focus:bg-surface/60 focus:outline-none backdrop-blur-xl transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]";

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search merchant, category, description..."
            aria-label="Search transactions"
            title="Search transactions"
            value={filters.search}
            onChange={(e) => dispatch({ type: AppActionType.SetFilter, payload: { search: e.target.value } })}
            className={`w-full pl-9 pr-4 h-10 ${inputClass}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-text-muted" />
          
          <div className="w-40">
            <Select
              value={filters.sortField}
              onValueChange={(value) => dispatch({ type: AppActionType.SetFilter, payload: { sortField: value as SortField } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {transactionSortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: AppActionType.SetFilter, payload: { sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' } })}
            aria-label={filters.sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
            title={filters.sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
            className="rounded-xl border border-white/10 bg-surface/40 flex items-center justify-center h-10 w-10 text-sm text-text-muted hover:text-text hover:bg-surface/60 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all"
          >
            {filters.sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Row 2: Type + Category + Date range + Reset */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Type */}
        <div className="flex rounded-xl border border-white/10 bg-surface/30 backdrop-blur-xl p-1 h-10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]">
          {(['all', TransactionTypeEnum.Income, TransactionTypeEnum.Expense] as Array<TransactionType | 'all'>).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => dispatch({ type: AppActionType.SetFilter, payload: { type: t } })}
              title={t === 'all' ? 'All transaction types' : t}
              className={`px-4 text-xs font-bold flex items-center justify-center tracking-wider uppercase transition-all rounded-lg ${
                filters.type === t
                  ? 'bg-accent/20 text-accent shadow-[0_0_10px_rgba(56,189,248,0.2)] border border-accent/30'
                  : 'text-text-muted hover:text-text hover:bg-white/5 border border-transparent'
              }`}
            >
              {t === 'all' ? 'All' : t}
            </button>
          ))}
        </div>

        {/* Category */}
        <div className="w-48">
          <Select
            value={filters.category}
            onValueChange={(value) => dispatch({ type: AppActionType.SetFilter, payload: { category: value as TransactionCategory | 'all' } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {transactionCategories.map((c) => (
                <SelectItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <div className="w-36">
            <DatePicker 
              date={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
              onDateChange={(date) => dispatch({ type: AppActionType.SetFilter, payload: { dateFrom: date ? date.toISOString().split('T')[0] : '' } })}
              placeholder="From date"
            />
          </div>
          <span className="text-xs font-medium text-text-muted/60 uppercase tracking-widest">to</span>
          <div className="w-36">
            <DatePicker 
              date={filters.dateTo ? new Date(filters.dateTo) : undefined}
              onDateChange={(date) => dispatch({ type: AppActionType.SetFilter, payload: { dateTo: date ? date.toISOString().split('T')[0] : '' } })}
              placeholder="To date"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => dispatch({ type: AppActionType.ResetFilters })}
            title="Reset filters"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 h-10 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 transition-all backdrop-blur-md"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}