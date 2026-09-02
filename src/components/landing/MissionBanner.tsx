import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const MissionBanner: React.FC = () => {
  return (
    <section id="mission" className="py-16 sm:py-20 bg-marine-950/80 border-b border-marine-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-marine-900/60 border border-marine-800/80 rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-xl text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-marine-50 tracking-tight">
              Ready to investigate marine oil spills?
            </h3>
            <p className="text-sm text-marine-300 leading-relaxed">
              Access the MarineGuard workstation to analyze satellite scenes, track vessel trajectories, and compile verified evidence dossiers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link to="/analyze" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Analysis
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full">
                Analyst Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
