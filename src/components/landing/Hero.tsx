import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Radar, Satellite, FileText } from 'lucide-react';
import { Button } from '../common/Button';
import { MarineScene } from './MarineScene';

export const Hero: React.FC = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-marine-750">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status Capsule */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-marine-600/70 bg-marine-850 text-marine-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            SMART INDIA HACKATHON • MARITIME SURVEILLANCE DIRECTIVE
          </span>
        </div>

        {/* Responsive Grid: Left Editorial Context, Right Dedicated 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mission Briefing */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
                Environmental Intelligence Platform
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-marine-50 tracking-tight leading-[1.15] mt-2">
                Satellite Oil Spill Detection & Maritime Investigation
              </h1>
            </div>

            <p className="text-base sm:text-lg text-marine-300 font-normal leading-relaxed">
              Detect suspected marine oil spills from satellite imagery and support evidence-based maritime investigation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/analyze">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  START ANALYSIS
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={scrollToHowItWorks}>
                HOW IT WORKS
              </Button>
            </div>

            {/* Technical Verification Badges */}
            <div className="pt-6 border-t border-marine-750/70 grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-marine-900/90 p-2.5 rounded border border-marine-700/60">
                <div className="flex items-center gap-1.5 text-teal-300 mb-1">
                  <Satellite className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold">SAR SENSING</span>
                </div>
                <span className="text-[11px] text-marine-400 block leading-tight">
                  Sentinel-1 & Optical Ingest
                </span>
              </div>

              <div className="bg-marine-900/90 p-2.5 rounded border border-marine-700/60">
                <div className="flex items-center gap-1.5 text-teal-300 mb-1">
                  <Radar className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold">AIS TRACK</span>
                </div>
                <span className="text-[11px] text-marine-400 block leading-tight">
                  Vessel Kinematic Match
                </span>
              </div>

              <div className="bg-marine-900/90 p-2.5 rounded border border-marine-700/60">
                <div className="flex items-center gap-1.5 text-teal-300 mb-1">
                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold">EVIDENCE</span>
                </div>
                <span className="text-[11px] text-marine-400 block leading-tight">
                  Legal Audit Dossier
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Dedicated 3D Scene Viewport (Spline Ready) */}
          <div className="lg:col-span-6 w-full">
            <MarineScene />
          </div>

        </div>

      </div>
    </section>
  );
};
