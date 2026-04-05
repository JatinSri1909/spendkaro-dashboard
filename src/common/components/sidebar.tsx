import { ChevronRight } from 'lucide-react';
import type { Role } from '../types';
import { sidebarNavItems } from '../constants';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  role: Role;
}

export function Sidebar({ activePage, onNavigate, role }: SidebarProps) {
  return (
    <aside className="relative z-20 flex h-full w-64 flex-col border-r border-white/10 bg-surface-alt/40 px-4 py-6 backdrop-blur-2xl">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-blue-600 shadow-lg shadow-accent/20">
          <span className="text-base font-black text-white">₹</span>
        </div>
        <div>
          <p className="text-base font-bold tracking-wide text-text drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">SpendKaro</p>
          <p className="text-[10px] uppercase tracking-widest text-text-muted">{role}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {sidebarNavItems.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              title={label}
              aria-label={label}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                active
                  ? 'bg-accent/80 text-white shadow-[0_0_20px_var(--token-accent-dim)] border border-accent/40 backdrop-blur-md'
                  : 'text-text-muted hover:bg-white/10 hover:text-text'
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left">{label}</span>
              {active && <ChevronRight size={12} className="opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="glass-panel !p-3">
        <p className="text-[10px] uppercase tracking-widest text-accent">Fiscal Period</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Oct '25 – Apr '26</p>
      </div>
    </aside>
  );
}
