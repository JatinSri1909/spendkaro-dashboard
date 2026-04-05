import type { FilterState, Role, Theme, Transaction } from '../types';

export enum AppActionType {
  SetRole = 'SET_ROLE',
  SetTheme = 'SET_THEME',
  AddTransaction = 'ADD_TRANSACTION',
  UpdateTransaction = 'UPDATE_TRANSACTION',
  DeleteTransaction = 'DELETE_TRANSACTION',
  SetFilter = 'SET_FILTER',
  ResetFilters = 'RESET_FILTERS',
}

export type AppAction =
  | { type: AppActionType.SetRole; payload: Role }
  | { type: AppActionType.SetTheme; payload: Theme }
  | { type: AppActionType.AddTransaction; payload: Transaction }
  | { type: AppActionType.UpdateTransaction; payload: Transaction }
  | { type: AppActionType.DeleteTransaction; payload: string }
  | { type: AppActionType.SetFilter; payload: Partial<FilterState> }
  | { type: AppActionType.ResetFilters };