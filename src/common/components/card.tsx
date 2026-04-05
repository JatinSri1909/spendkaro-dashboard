import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`glass-panel transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
