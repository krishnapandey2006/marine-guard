import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, Compass, FileCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { EarthVisualization } from './EarthVisualization';

export const Hero: React.FC = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="overview"
      className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-marine-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: Left Editorial Context, Right 3D Earth Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Mission Briefing */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Environmental Intelligence Platform
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-marine-50 tracking-tight leading-[1.12] mt-3">
                Satellite Oil Spill Detection & Maritime Investigation
              </h1>
            </div>

            <p className="text-base sm:text-lg text-marine-300 font-normal leading-relaxed max-w-xl">
              Detect suspected marine oil spills from satellite imagery and support evidence-based maritime investigation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/analyze">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start Analysis
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={scrollToHowItWorks}>
                How It Works
              </Button>
            </div>

            {/* 3 Quiet Supporting Capability Cards */}
            <div className="pt-8 border-t border-marine-800/70 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-marine-900/50 p-3.5 rounded-lg border border-marine-800/80">
                <div className="flex items-center gap-2 text-marine-100 mb-1">
                  <Satellite className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold text-xs text-marine-100">SAR Sensing</span>
                </div>
                <span className="text-xs text-marine-400 block leading-snug">
                  Sentinel-1 & Optical Ingest
                </span>
              </div>

              <div className="bg-marine-900/50 p-3.5 rounded-lg border border-marine-800/80">
                <div className="flex items-center gap-2 text-marine-100 mb-1">
                  <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold text-xs text-marine-100">AIS Tracking</span>
                </div>
                <span className="text-xs text-marine-400 block leading-snug">
                  Vessel Kinematic Match
                </span>
              </div>

              <div className="bg-marine-900/50 p-3.5 rounded-lg border border-marine-800/80">
                <div className="flex items-center gap-2 text-marine-100 mb-1">
                  <FileCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold text-xs text-marine-100">Evidence Dossier</span>
                </div>
                <span className="text-xs text-marine-400 block leading-snug">
                  Legal Audit Records
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Earth Visualization Viewport */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <EarthVisualization />
          </div>

        </div>

      </div>
    </section>
  );
};
