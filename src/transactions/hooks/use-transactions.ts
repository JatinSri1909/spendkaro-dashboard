import { useMemo } from 'react';
import { useAppContext } from '@/common/hooks';
import type { Transaction } from '@/common/types';
import { AppActionType } from '@/common/constants';

export function useTransactions() {
  const { state, dispatch } = useAppContext();
  const { transactions, filters, role } = state;

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (filters.sortField) {
        case 'date':
          cmp = a.date.localeCompare(b.date);
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'category':
          cmp = a.category.localeCompare(b.category);
          break;
        case 'merchant':
          cmp = a.merchant.localeCompare(b.merchant);
          break;
      }
      return filters.sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [transactions, filters]);

  function deleteTransaction(id: string) {
    dispatch({ type: AppActionType.DeleteTransaction, payload: id });
  }

  function exportCSV() {
    const headers = ['Date', 'Merchant', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filtered.map((t: Transaction) => [
      t.date, t.merchant, t.description, t.category, t.type, t.amount,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportJSON() {
    const json = JSON.stringify(filtered, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return { filtered, role, deleteTransaction, exportCSV, exportJSON };
}
