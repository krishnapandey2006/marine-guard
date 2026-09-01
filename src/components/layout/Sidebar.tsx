import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanSearch, 
  History, 
  Ship, 
  FileText, 
  Settings, 
  LogOut,
  Radio,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface SidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { logout, user } = useAuth();

  const navigation = [
    { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Image', to: '/analyze', icon: ScanSearch, badge: 'CORE' },
    { name: 'Analysis History', to: '/history', icon: History },
    { name: 'Vessel Attribution', to: '/investigation', icon: Ship },
    { name: 'Evidence Reports', to: '/reports', icon: FileText },
    { name: 'System Settings', to: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-marine-900 border-r border-marine-750 flex flex-col justify-between shrink-0 h-full">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-marine-750 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-marine-800 border border-teal-500/50 flex items-center justify-center text-teal-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-marine-50 tracking-tight">MARINEGUARD</div>
              <div className="text-[10px] font-mono text-marine-400">Tactical Console</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-marine-400">
            Workstation Menus
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-950/70 text-teal-300 border border-teal-700/60 shadow-sm font-semibold'
                      : 'text-marine-300 hover:bg-marine-800/80 hover:text-marine-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700/40">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sensor Ingest Status & User Info */}
      <div className="p-3 border-t border-marine-750 space-y-3">
        {/* Active Sensor Badge */}
        <div className="bg-marine-850 p-2.5 rounded border border-marine-700/60 text-[11px] font-mono text-marine-300 space-y-1">
          <div className="flex items-center justify-between text-teal-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-teal-400" />
              <span>SAR SENSOR SYNC</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-marine-400">Sentinel-1 Node Online</p>
        </div>

        {/* User Card */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-marine-800 border border-marine-600 flex items-center justify-center text-xs font-bold text-teal-400 uppercase shrink-0">
              {user?.displayName?.[0] || 'A'}
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-medium text-marine-100 truncate">
                {user?.displayName || 'Analyst Operator'}
              </p>
              <p className="text-[10px] font-mono text-marine-400 truncate">
                {user?.organization || 'Surveillance Node'}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 text-marine-400 hover:text-red-400 hover:bg-marine-800 rounded transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
