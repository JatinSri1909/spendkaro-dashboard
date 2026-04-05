import { Sun, Moon, Menu } from 'lucide-react';
import { useAppContext } from '../hooks/app-context';
import { RoleEnum, type Role } from '../types';
import { AppActionType } from '../constants';

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
}


export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { state, dispatch } = useAppContext();

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/8 bg-surface-alt px-4 md:px-6">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            title="Open navigation menu"
            className="rounded-lg p-1.5 text-text-muted hover:bg-white/8 hover:text-text md:hidden"
          >
            <Menu size={18} />
          </button>
        )}
        <h1 className="text-base font-semibold text-text">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Role Switcher */}
        <select
          value={state.role}
          onChange={(e) => dispatch({ type: AppActionType.SetRole, payload: e.target.value as Role })}
          aria-label="User role"
          title="User role"
          className="cursor-pointer rounded-lg border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-text outline-none focus:border-accent/50 transition-colors"
        >
          <option value={RoleEnum.Viewer}>👁 Viewer</option>
          <option value={RoleEnum.Admin}>🔑 Admin</option>
        </select>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() =>
            dispatch({ type: AppActionType.SetTheme, payload: state.theme === 'dark' ? 'light' : 'dark' })
          }
          aria-label={state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-text-muted hover:bg-white/14 hover:text-text transition-colors"
          title={state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {state.theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
