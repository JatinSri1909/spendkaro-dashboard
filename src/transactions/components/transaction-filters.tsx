import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { useAppContext } from '@/common/hooks';
import { TransactionTypeEnum, type TransactionCategory, type TransactionType, type SortField } from '@/common/types';
import { AppActionType } from '@/common/constants';
import { transactionCategories, transactionSortOptions } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, DatePicker } from '@/common/components';

export function TransactionFilters() {
  const { state, dispatch } = useAppContext();
  const { filters } = state;
  const [searchInput, setSearchInput] = useState(filters.search);
  const [mobileFiltersMounted, setMobileFiltersMounted] = useState(false);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== filters.search) {
        dispatch({ type: AppActionType.SetFilter, payload: { search: searchInput } });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, filters.search, dispatch]);

  useEffect(() => {
    if (!mobileFiltersVisible && mobileFiltersMounted) {
      const timeout = setTimeout(() => setMobileFiltersMounted(false), 260);
      return () => clearTimeout(timeout);
    }
  }, [mobileFiltersVisible, mobileFiltersMounted]);

  function openMobileFilters() {
    setMobileFiltersMounted(true);
    requestAnimationFrame(() => setMobileFiltersVisible(true));
  }

  function closeMobileFilters() {
    setMobileFiltersVisible(false);
  }

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' ||
    filters.dateFrom || filters.dateTo;

  const inputClass = "rounded-xl border border-white/10 bg-surface/40 px-3 py-2.5 text-sm text-text focus:border-accent/50 focus:bg-surface/60 focus:outline-none backdrop-blur-xl transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]";

  const advancedFilters = (
    <>
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

      <div className="flex flex-wrap gap-2 items-center">
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
            onClick={() => {
              setSearchInput('');
              dispatch({ type: AppActionType.ResetFilters });
            }}
            title="Reset filters"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 h-10 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 transition-all backdrop-blur-md"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="sm:hidden flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Search merchant, category, description..."
              aria-label="Search transactions"
              title="Search transactions"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`w-full pl-9 pr-4 h-10 ${inputClass}`}
            />
          </div>

          <button
            type="button"
            onClick={openMobileFilters}
            className="md:hidden flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-surface/40 px-3 text-xs font-semibold text-text hover:bg-surface/60 transition-colors"
            title="Open filters"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                dispatch({ type: AppActionType.ResetFilters });
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
              title="Reset filters"
              aria-label="Reset filters"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Search merchant, category, description..."
              aria-label="Search transactions"
              title="Search transactions"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

        <div className="flex flex-wrap gap-2 items-center">
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
              onClick={() => {
                setSearchInput('');
                dispatch({ type: AppActionType.ResetFilters });
              }}
              title="Reset filters"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 h-10 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 transition-all backdrop-blur-md"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {mobileFiltersMounted && typeof document !== 'undefined' && createPortal(
        <div className="sm:hidden fixed inset-0 z-40">
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
              mobileFiltersVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileFilters}
          />
          <div
            className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-background p-4 shadow-2xl transition-transform duration-300 ease-out ${
              mobileFiltersVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-text">Filters</p>
              <button
                type="button"
                onClick={closeMobileFilters}
                className="rounded-lg p-2 text-text-muted hover:bg-white/10 hover:text-text transition-colors"
                aria-label="Close filters"
                title="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {advancedFilters}
            </div>

            <button
              type="button"
              onClick={closeMobileFilters}
              className="mt-4 w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}