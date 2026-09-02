import React, { useState, useEffect } from 'react';
import { Menu, Clock, ShieldCheck, User } from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';
import { useAuth } from '../../context/useAuth';

export interface TopBarProps {
  onToggleMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-marine-900 border-b border-marine-750 px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
      
      {/* Left: Mobile toggle & UTC Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded text-marine-300 hover:text-white hover:bg-marine-800 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-marine-400">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>{utcTime || '2026-09-02 00:00:00 UTC'}</span>
        </div>
      </div>

      {/* Right: Operational Status & Analyst User Chip */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 bg-marine-850 px-2.5 py-1 rounded border border-marine-750">
          <StatusIndicator status="ready" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-marine-300 hidden sm:inline">
            FastAPI Pipeline Live
          </span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-marine-750">
          <div className="w-7 h-7 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-marine-100 leading-tight">
              {user?.displayName || 'Analyst Operator'}
            </div>
            <div className="text-[10px] font-mono text-teal-400 flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" />
              {user?.clearanceLevel ? user.clearanceLevel.split('-')[0].trim() : 'Level 2 Clearance'}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};
