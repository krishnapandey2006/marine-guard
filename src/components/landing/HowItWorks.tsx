import React from 'react';
import { UploadCloud, ScanEye, Navigation2, FileSpreadsheet } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'SATELLITE IMAGE',
      icon: UploadCloud,
      desc: 'Upload high-resolution SAR (Synthetic Aperture Radar) or optical ocean scenes in standard GeoTIFF/raster formats.',
      detail: 'Supports Sentinel-1, Sentinel-2, Landsat data formats',
    },
    {
      num: '02',
      title: 'SPILL DETECTION',
      icon: ScanEye,
      desc: 'AI/ML segmentation models analyze radiometric roughness to distinguish true hydrocarbon slicks from biogenic look-alikes.',
      detail: 'Confidence scoring, boundary delineation, estimated area',
    },
    {
      num: '03',
      title: 'MARITIME ANALYSIS',
      icon: Navigation2,
      desc: 'Historical AIS vessel trajectories within the temporal spill window are correlated to isolate candidate vessels.',
      detail: 'Closest point of approach (CPA) calculation & trajectory review',
    },
    {
      num: '04',
      title: 'EVIDENCE REPORT',
      icon: FileSpreadsheet,
      desc: 'Generate a structured investigation dossier with geospatial coordinates, vessel metadata, and tamper-evident audit logs.',
      detail: 'Maritime law enforcement & environmental agency ready',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 border-b border-marine-750 bg-marine-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
            System Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-marine-50 tracking-tight mt-1">
            How MarineGuard Operates
          </h2>
          <p className="text-sm sm:text-base text-marine-300 mt-2">
            A four-stage intelligence workflow transforming raw satellite telemetry into actionable maritime enforcement intelligence.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-marine-900 border border-marine-700/70 rounded-md p-5 flex flex-col justify-between hover:border-marine-600 transition-colors shadow-console"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4 border-b border-marine-800 pb-3">
                    <span className="font-mono text-xl font-bold text-teal-400">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-marine-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold tracking-wide text-marine-100 uppercase mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-marine-300 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-marine-800/80 font-mono text-[11px] text-marine-400">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
