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
    <aside className="flex h-full w-64 flex-col border-r border-white/8 bg-surface-alt px-4 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
          <span className="text-base font-black text-white">₹</span>
        </div>
        <div>
          <p className="text-sm font-bold tracking-wide text-text">SpendKaro</p>
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
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'text-text-muted hover:bg-white/6 hover:text-text'
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
      <div className="rounded-xl border border-white/8 bg-white/4 px-3 py-3">
        <p className="text-[10px] uppercase tracking-widest text-text-muted">Fiscal Period</p>
        <p className="mt-0.5 text-sm font-semibold text-text">Jan – Jun 2025</p>
      </div>
    </aside>
  );
}
