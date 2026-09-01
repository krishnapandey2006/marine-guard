import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: 'default' | 'subtle' | 'bordered';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = 'default',
  noPadding = false,
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-marine-800 border-marine-600/60 shadow-console',
    subtle: 'bg-marine-850/80 border-marine-700/50',
    bordered: 'bg-marine-900 border-marine-600',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'rounded-md border text-marine-100 transition-all',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between border-b border-marine-700/60 px-4 py-3 sm:px-5">
          <div>
            {title && <h3 className="text-sm font-semibold text-marine-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-marine-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className={clsx(!noPadding && 'p-4 sm:p-5')}>{children}</div>
    </div>
  );
};
