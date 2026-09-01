import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Anchor, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const MissionBanner: React.FC = () => {
  return (
    <section id="mission" className="py-14 bg-marine-900 border-b border-marine-750">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-marine-800 border border-marine-600/70 rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-console-elevated">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-semibold uppercase">
              <Anchor className="w-4 h-4" />
              <span>National Maritime Intelligence Directive</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-marine-50 tracking-tight">
              Ready to execute satellite surveillance?
            </h3>
            <p className="text-xs sm:text-sm text-marine-300">
              Access the MarineGuard tactical workstation to upload radar scenes, monitor marine corridors, and compile forensic evidence dossiers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link to="/analyze" className="w-full sm:w-auto">
              <Button size="md" variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Console
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="md" variant="secondary" className="w-full" leftIcon={<ShieldCheck className="w-4 h-4 text-teal-400" />}>
                Analyst Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
