import { BadgeVariant } from '../constants';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: BadgeVariant;
}

export function Badge({ label, color, variant }: BadgeProps) {
  const variantClasses: Partial<Record<BadgeVariant, string>> = {
    [BadgeVariant.Income]: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    [BadgeVariant.Expense]: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
  };

  const variantClass =
    variant ? variantClasses[variant] ?? 'bg-white/8 text-text-muted border-white/10' : 'bg-white/8 text-text-muted border-white/10';

  if (color) {
    return (
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClass}`}
    >
      {label}
    </span>
  );
}
