import { Sun, Moon, Menu } from 'lucide-react';
import { useAppContext } from '../hooks/app-context';
import { RoleEnum } from '../types';
import { AppActionType } from '../constants';

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { state, dispatch } = useAppContext();

  return (
    <header className="relative z-10 flex h-14 items-center justify-between border-b border-white/10 bg-surface-alt/50 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            title="Open navigation menu"
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-white/10 hover:text-text md:hidden"
          >
            <Menu size={18} />
          </button>
        )}
        <h1 className="text-xl font-bold tracking-wide text-text drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <div className="flex items-center rounded-xl bg-surface/40 p-1 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]">
          <button
            onClick={() => dispatch({ type: AppActionType.SetRole, payload: RoleEnum.Viewer })}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              state.role === RoleEnum.Viewer
                ? 'bg-accent/20 text-accent shadow-[0_0_10px_rgba(56,189,248,0.2)] border border-accent/30'
                : 'text-text-muted hover:text-text hover:bg-white/5 border border-transparent'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => dispatch({ type: AppActionType.SetRole, payload: RoleEnum.Admin })}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              state.role === RoleEnum.Admin
                ? 'bg-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)] border border-rose-500/30'
                : 'text-text-muted hover:text-text hover:bg-white/5 border border-transparent'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() =>
            dispatch({ type: AppActionType.SetTheme, payload: state.theme === 'dark' ? 'light' : 'dark' })
          }
          aria-label={state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-surface/60 text-text-muted shadow-sm backdrop-blur-md transition-all hover:bg-white/10 hover:text-accent hover:shadow-[0_0_15px_var(--token-accent-dim)]"
          title={state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {state.theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
