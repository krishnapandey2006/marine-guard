import React from 'react';
import { Compass, Shield, Orbit } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-marine-950 border-t border-marine-800 text-marine-400 text-xs py-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-marine-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-marine-850 border border-marine-700 flex items-center justify-center text-teal-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-marine-100 font-sans tracking-wide">MARINEGUARD</span>
              <p className="text-[11px] text-marine-400">Satellite Oil Spill Detection & Maritime Intelligence</p>
            </div>
          </div>

          {/* System Metadata Tags */}
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-marine-300">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>SIH PROBLEM STATEMENT ARCHITECTURE</span>
            </div>
            <span className="text-marine-600">|</span>
            <div className="flex items-center gap-1.5 text-marine-300">
              <Orbit className="w-3.5 h-3.5 text-teal-400" />
              <span>SAR SATELLITE TELEMETRY READY</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal / SIH Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-marine-400">
          <p>
            © {new Date().getFullYear()} MarineGuard System. Built for Smart India Hackathon.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-marine-300 transition-colors cursor-pointer">Security Protocol</span>
            <span className="hover:text-marine-300 transition-colors cursor-pointer">SAR Data Ingest Standard</span>
            <span className="hover:text-marine-300 transition-colors cursor-pointer">AIS Correlation Matrix</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
