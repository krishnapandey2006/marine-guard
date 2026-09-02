import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-marine-950 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow-sm focus:ring-teal-500 border border-teal-500/30 active:bg-teal-700',
    secondary: 'bg-marine-750 hover:bg-marine-700 text-marine-100 focus:ring-marine-500 border border-marine-600/50 shadow-sm active:bg-marine-800',
    outline: 'bg-transparent hover:bg-marine-800 text-marine-200 border border-marine-600 focus:ring-marine-500 active:bg-marine-750',
    ghost: 'bg-transparent hover:bg-marine-800/60 text-marine-300 hover:text-marine-100 focus:ring-marine-500 active:bg-marine-800',
    danger: 'bg-red-700/80 hover:bg-red-600 text-white focus:ring-red-500 border border-red-600/40 active:bg-red-800',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
