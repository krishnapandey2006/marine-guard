import React from 'react';
import { clsx } from 'clsx';

export interface StatusIndicatorProps {
  status: 'ready' | 'processing' | 'warning' | 'error' | 'idle';
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, className }) => {
  const config = {
    ready: {
      color: 'bg-emerald-400',
      pulse: 'bg-emerald-400/40 animate-ping',
      textColor: 'text-emerald-300',
      defaultLabel: 'SYSTEM READY',
    },
    processing: {
      color: 'bg-sky-400',
      pulse: 'bg-sky-400/40 animate-ping',
      textColor: 'text-sky-300',
      defaultLabel: 'PROCESSING PIPELINE',
    },
    warning: {
      color: 'bg-amber-400',
      pulse: 'bg-amber-400/40 animate-ping',
      textColor: 'text-amber-300',
      defaultLabel: 'ATTENTION REQUIRED',
    },
    error: {
      color: 'bg-rose-400',
      pulse: 'bg-rose-400/40',
      textColor: 'text-rose-300',
      defaultLabel: 'SYSTEM FAULT',
    },
    idle: {
      color: 'bg-marine-400',
      pulse: 'hidden',
      textColor: 'text-marine-400',
      defaultLabel: 'STANDBY',
    },
  };

  const current = config[status];

  return (
    <div className={clsx('inline-flex items-center gap-2 font-mono text-xs font-medium select-none', className)}>
      <div className="relative flex items-center justify-center w-2.5 h-2.5">
        <span className={clsx('absolute w-full h-full rounded-full opacity-75', current.pulse)} />
        <span className={clsx('relative w-1.5 h-1.5 rounded-full', current.color)} />
      </div>
      <span className={clsx('tracking-wider uppercase text-[11px]', current.textColor)}>
        {label || current.defaultLabel}
      </span>
    </div>
  );
};
