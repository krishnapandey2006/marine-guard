import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Orbit, Radio } from 'lucide-react';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-marine-950 flex flex-col justify-between selection:bg-teal-900 selection:text-teal-200">
      
      {/* Top Simple Header */}
      <header className="border-b border-marine-800 bg-marine-900/60 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-7 h-7 rounded bg-marine-800 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-base text-marine-50">MARINEGUARD</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-mono text-marine-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="hidden sm:inline">AUTH WORKSTATION PORTAL</span>
        </div>
      </header>

      {/* Main Split Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-lg border border-marine-700/80 bg-marine-900 shadow-2xl overflow-hidden">
          
          {/* Left Context Briefing (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 bg-marine-850 p-8 flex-col justify-between border-r border-marine-700/80 relative">
            <div className="absolute inset-0 maritime-grid opacity-20 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold">
                  Secure Access Protocol
                </span>
                <h2 className="text-xl font-bold text-marine-50 tracking-tight">
                  Maritime Intelligence & Surveillance Workstation
                </h2>
                <p className="text-xs text-marine-300 leading-relaxed">
                  Authorized analyst console for Sentinel SAR ingest, spill perimeter verification, and automated AIS transponder correlation.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-marine-750 font-mono text-xs text-marine-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Chain-of-custody evidentiary logging</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Orbit className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>C-Band Synthetic Aperture Radar ingestion</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Historical AIS vessel kinematic correlation</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-marine-750/80 text-[11px] font-mono text-marine-400 space-y-1">
              <div>SYSTEM CLASSIFICATION: OFFICIAL USE</div>
              <div className="text-[10px] text-marine-500">SIH National Maritime Directorate</div>
            </div>
          </div>

          {/* Right Form Console */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-marine-900">
            <div className="w-full max-w-md mx-auto space-y-6">
              
              <div className="space-y-1 text-left">
                <h1 className="text-2xl font-bold text-marine-50 tracking-tight">
                  {title}
                </h1>
                <p className="text-xs sm:text-sm text-marine-300">
                  {subtitle}
                </p>
              </div>

              {children}

            </div>
          </div>

        </div>
      </main>

      {/* Auth Footer */}
      <footer className="border-t border-marine-800/80 py-3 text-center text-xs font-mono text-marine-400">
        MarineGuard Maritime Intelligence • All operations logged for security compliance
      </footer>
    </div>
  );
};
