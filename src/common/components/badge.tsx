import { BadgeVariant } from '../constants';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, color, variant, className = '' }: BadgeProps) {
  const variantClasses: Partial<Record<BadgeVariant, string>> = {
    [BadgeVariant.Income]: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    [BadgeVariant.Expense]: 'bg-red-500/15 text-red-500 border-red-500/25',
  };

  const variantClass =
    variant ? variantClasses[variant] ?? 'bg-white/8 text-text-muted border-white/10' : 'bg-white/8 text-text-muted border-white/10';
  
  if (color) {
    return (
      <span
        className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] backdrop-blur-md ${className}`}
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex min-w-[72px] items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm backdrop-blur-md ${variantClass} ${className}`}
    >
      {label}
    </span>
  );
}
