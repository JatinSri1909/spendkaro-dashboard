import React, { useReducer, useEffect } from 'react';
import { AppContext } from './app-context';
import { loadState, reducer } from './app-state';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(
      'financeApp',
      JSON.stringify({ transactions: state.transactions, role: state.role, theme: state.theme })
    );
  }, [state.transactions, state.role, state.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', state.theme === 'light');
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('admin-mode', state.role === 'admin');
  }, [state.role]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
