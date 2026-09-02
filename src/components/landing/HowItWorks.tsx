import React, { useState } from 'react';
import { UploadCloud, ScanEye, Navigation2, FileSpreadsheet, ChevronRight } from 'lucide-react';
import { RadarVisualization } from './RadarVisualization';

export const HowItWorks: React.FC = () => {
  const [activeStage, setActiveStage] = useState('03');

  const steps = [
    {
      num: '01',
      title: 'Satellite Image Ingestion',
      subtitle: 'SAR & Optical Imagery',
      icon: UploadCloud,
      desc: 'Ingest high-resolution Synthetic Aperture Radar (SAR) or optical satellite scenes in standard GeoTIFF formats.',
      detail: 'Supports Sentinel-1 C-Band and optical imagery with automated geospatial metadata extraction.',
    },
    {
      num: '02',
      title: 'AI Spill Detection & Delineation',
      subtitle: 'Neural Roughness Segmentation',
      icon: ScanEye,
      desc: 'Deep learning segmentation distinguishes mineral hydrocarbon slicks from look-alikes and low-wind calm water.',
      detail: 'Automated boundary vectorization, confidence scoring, and surface area calculation.',
    },
    {
      num: '03',
      title: 'Spatio-Temporal AIS Analysis',
      subtitle: 'Maritime Vessel Attribution',
      icon: Navigation2,
      desc: 'Historical AIS vessel trajectories are correlated within the detection window to isolate candidate source vessels.',
      detail: 'Closest Point of Approach (CPA) calculation and kinematic trajectory backtracking.',
    },
    {
      num: '04',
      title: 'Chain-of-Custody Evidence Dossier',
      subtitle: 'Forensic Investigation Records',
      icon: FileSpreadsheet,
      desc: 'Generate a structured investigation dossier with geospatial coordinates, vessel logs, and audit records.',
      detail: 'Standardized export package formatted for maritime authorities and enforcement agencies.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-b border-marine-800/80 bg-marine-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-marine-50 tracking-tight mt-2">
            How MarineGuard Operates
          </h2>
          <p className="text-sm sm:text-base text-marine-300 mt-2.5 leading-relaxed">
            A four-stage intelligence pipeline transforming raw satellite telemetry into actionable maritime investigation.
          </p>
        </div>

        {/* Dual Layout: Left Interactive Workflow Steps, Right Maritime Radar Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 4-Stage Steps */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStage === step.num;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStage(step.num)}
                  className={`cursor-pointer rounded-lg p-4 border transition-colors duration-150 text-left ${
                    isActive
                      ? 'bg-marine-900/90 border-teal-500/70 shadow-sm ring-1 ring-teal-500/30'
                      : 'bg-marine-900/30 border-marine-800/60 hover:bg-marine-900/60 hover:border-marine-700/60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Step Icon */}
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                        isActive
                          ? 'bg-teal-950/80 border-teal-500/50 text-teal-300'
                          : 'bg-marine-850 border-marine-750 text-marine-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-marine-100 tracking-tight">
                          {step.num} — {step.title}
                        </h3>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isActive ? 'text-teal-400 rotate-90' : 'text-marine-500'
                          }`}
                        />
                      </div>
                      <p className="text-xs text-marine-400 mt-1 leading-snug">
                        {step.desc}
                      </p>

                      {isActive && (
                        <div className="mt-2.5 pt-2.5 border-t border-marine-800 text-xs text-teal-300/90 font-mono animate-fadeIn">
                          {step.detail}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Radar Canvas */}
          <div className="lg:col-span-7 flex justify-center">
            <RadarVisualization activeStep={activeStage} />
          </div>

        </div>
      </div>
    </section>
  );
};
