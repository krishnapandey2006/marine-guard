import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ready' | 'warning' | 'danger' | 'teal' | 'neutral' | 'info';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  dot = false,
}) => {
  const variantStyles = {
    ready: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
    danger: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
    teal: 'bg-teal-950/70 text-teal-300 border-teal-700/60',
    neutral: 'bg-marine-800 text-marine-300 border-marine-600/50',
    info: 'bg-sky-950/60 text-sky-300 border-sky-800/60',
  };

  const dotColors = {
    ready: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-400',
    teal: 'bg-teal-400',
    neutral: 'bg-marine-400',
    info: 'bg-sky-400',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-mono',
    md: 'text-xs px-2.5 py-1 font-mono',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-medium rounded border uppercase tracking-wider',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
