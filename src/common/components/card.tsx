import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-surface backdrop-blur-sm transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
