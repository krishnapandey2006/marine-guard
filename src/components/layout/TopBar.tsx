import React, { useState, useEffect } from 'react';
import { Menu, Clock, ShieldCheck, User } from 'lucide-react';
import { StatusIndicator } from '../common/StatusIndicator';
import { useAuth } from '../../context/AuthContext';

export interface TopBarProps {
  onToggleMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toUTCString().replace('GMT', 'UTC');
      setUtcTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 bg-marine-900 border-b border-marine-750 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
      
      {/* Left: Mobile Toggle & Workstation Classification */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded text-marine-300 hover:text-marine-100 hover:bg-marine-800 focus:outline-none"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-marine-400">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-marine-300">SURVEILLANCE WORKSTATION</span>
          <span className="text-marine-600">|</span>
          <span className="text-[11px] text-marine-400">ZONE: ARABIAN SEA / BAY OF BENGAL</span>
        </div>
      </div>

      {/* Right: Operational Status, Live UTC Clock & Analyst Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Live System Operational Status */}
        <div className="hidden md:flex items-center">
          <StatusIndicator status="ready" label="SYSTEM READY" />
        </div>

        {/* Live UTC Clock */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-marine-300 bg-marine-850 px-2.5 py-1 rounded border border-marine-700/60">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>{utcTime || 'UTC CLOCK SYNC...'}</span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-marine-800 border border-marine-700 text-xs">
            <User className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium text-marine-200 hidden sm:inline">
              {user?.displayName || 'Analyst'}
            </span>
          </div>
        </div>

      </div>

    </header>
  );
};
