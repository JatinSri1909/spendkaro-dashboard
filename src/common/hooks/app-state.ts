import type { Transaction, Role, Theme, FilterState } from '../types';
import { RoleEnum } from '../types';
import { mockTransactions } from '../libs/mock-data';
import { AppActionType, type AppAction } from '../constants';

export interface AppState {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  filters: FilterState;
}

const defaultFilters: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  sortField: 'date',
  sortDirection: 'desc',
};

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem('financeApp');
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<AppState>;
      return {
        transactions: parsed.transactions ?? mockTransactions,
        role: parsed.role ?? RoleEnum.Viewer,
        theme: parsed.theme ?? 'dark',
        filters: defaultFilters,
      };
    }
  } catch {
    // ignore
  }
  return {
    transactions: mockTransactions,
    role: RoleEnum.Viewer,
    theme: 'dark',
    filters: defaultFilters,
  };
}

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.SetRole:
      return { ...state, role: action.payload };
    case AppActionType.SetTheme:
      return { ...state, theme: action.payload };
    case AppActionType.AddTransaction:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case AppActionType.UpdateTransaction:
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case AppActionType.DeleteTransaction:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case AppActionType.SetFilter:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case AppActionType.ResetFilters:
      return { ...state, filters: defaultFilters };
    default:
      return state;
  }
}