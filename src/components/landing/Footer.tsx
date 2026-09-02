import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-marine-950 border-t border-marine-800/80 text-marine-400 text-xs py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-marine-800/60">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-marine-850 border border-marine-750 flex items-center justify-center text-teal-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-marine-100 text-sm tracking-tight block">MarineGuard</span>
              <p className="text-xs text-marine-400">Satellite Oil Spill Detection & Maritime Intelligence</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-marine-300">
            <a href="#overview" className="hover:text-marine-100 transition-colors">Overview</a>
            <a href="#how-it-works" className="hover:text-marine-100 transition-colors">How It Works</a>
            <a href="#technology" className="hover:text-marine-100 transition-colors">Technology</a>
            <Link to="/analyze" className="hover:text-marine-100 transition-colors">Workstation</Link>
            <Link to="/dashboard" className="hover:text-marine-100 transition-colors">Dossiers</Link>
          </div>

        </div>

        {/* Bottom Legal / SIH Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-marine-400">
          <p>
            © {new Date().getFullYear()} MarineGuard. Smart India Hackathon.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-marine-300 transition-colors">SAR & Optical Ingestion</span>
            <span className="hover:text-marine-300 transition-colors">AIS Correlation</span>
            <span className="hover:text-marine-300 transition-colors">Chain of Custody</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
