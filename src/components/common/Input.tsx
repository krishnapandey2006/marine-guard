import React, { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightElement,
      showPasswordToggle = true,
      className,
      id,
      type,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isPasswordField = type === 'password';
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const effectiveType = isPasswordField
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : type;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-marine-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-marine-400 pointer-events-none flex items-center justify-center z-10">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            className={twMerge(
              clsx(
                'w-full bg-marine-900 border text-marine-100 rounded px-3.5 py-2 text-sm placeholder:text-marine-500 transition-colors duration-150',
                'focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500',
                leftIcon ? 'pl-9' : 'pl-3.5',
                (isPasswordField && showPasswordToggle) || rightElement ? 'pr-11' : 'pr-3.5',
                error ? 'border-red-500/80 focus:ring-red-500 focus:border-red-500' : 'border-marine-600/70 hover:border-marine-500',
                className
              )
            )}
            {...props}
          />
          {isPasswordField && showPasswordToggle ? (
            <div className="absolute right-2.5 flex items-center justify-center z-10">
              <button
                type="button"
                tabIndex={-1}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="p-1 rounded text-marine-400 hover:text-teal-400 hover:bg-marine-800/80 transition-colors focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPasswordVisible ? (
                    <motion.div
                      key="eye-off"
                      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <EyeOff className="w-4 h-4 text-teal-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye-on"
                      initial={{ opacity: 0, scale: 0.7, rotate: 20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: -20 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 text-marine-400 hover:text-marine-200" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ) : (
            rightElement && (
              <div className="absolute right-3 flex items-center justify-center">
                {rightElement}
              </div>
            )
          )}
        </div>
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-marine-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

