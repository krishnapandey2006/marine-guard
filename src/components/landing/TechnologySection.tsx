import React from 'react';
import { Satellite, Cpu, Radio, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TechnologySection: React.FC = () => {
  const techItems = [
    {
      title: 'Satellite & SAR Processing',
      icon: Satellite,
      status: 'AVAILABLE',
      statusText: 'STEP 1: INGEST READY',
      description: 'Ingests high-resolution satellite imagery (Sentinel-1 C-Band SAR, Sentinel-2 Optical, and raster scenes) for dark spot and capillary wave dampening analysis.',
      features: [
        'Multi-format file inspection (TIFF, PNG, JPG)',
        'Client-side metadata extraction & raster validation',
        'FastAPI-ready asynchronous upload pipeline',
      ],
    },
    {
      title: 'AI & Machine Learning Vision',
      icon: Cpu,
      status: 'PIPELINE',
      statusText: 'ANALYSIS PIPELINE (STEP 2)',
      description: 'Deep neural segmentation architectures to classify surface roughness anomalies, distinguishing true mineral oil slicks from low-wind calm zones and biogenic films.',
      features: [
        'Semantic segmentation for boundary polygon extraction',
        'Look-alike confidence filtering (false-positive reduction)',
        'Centroid and surface area square-kilometer computation',
      ],
    },
    {
      title: 'Historical AIS Vessel Attribution',
      icon: Radio,
      status: 'PIPELINE',
      statusText: 'ANALYSIS PIPELINE (STEP 2)',
      description: 'Automated spatio-temporal correlation against global Automatic Identification System (AIS) transponder broadcasts within the detection perimeter.',
      features: [
        'Closest Point of Approach (CPA) temporal indexing',
        'MMSI, IMO, and vessel flag correlation',
        'Vessel trajectory backtracking',
      ],
    },
    {
      title: 'Chain-of-Custody Evidence Reporting',
      icon: FileCheck,
      status: 'AVAILABLE',
      statusText: 'STEP 1: DOSSIER SHELL',
      description: 'Generates structured, tamper-evident investigation records for maritime law enforcement agencies, port authorities, and environmental ministries.',
      features: [
        'Standardized incident reporting structure',
        'Geospatial boundary coordinate logging',
        'Audit-ready case dossier generation',
      ],
    },
  ];

  return (
    <section id="technology" className="py-16 sm:py-20 border-b border-marine-750 bg-marine-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
            Architecture & Pipeline Readiness
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-marine-50 tracking-tight mt-1">
            Core Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-marine-300 mt-2">
            Engineering a transparent distinction between the established Step 1 frontend foundation and forthcoming ML/AIS analytical microservices.
          </p>
        </div>

        {/* 2x2 Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techItems.map((item, idx) => {
            const Icon = item.icon;
            const isAvailable = item.status === 'AVAILABLE';

            return (
              <div
                key={idx}
                className="bg-marine-850 border border-marine-700/80 rounded-md p-6 flex flex-col justify-between shadow-console"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-marine-100 tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <Badge
                      variant={isAvailable ? 'ready' : 'info'}
                      size="sm"
                    >
                      {item.statusText}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-marine-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-3 border-t border-marine-750 font-mono text-xs text-marine-300">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        {isAvailable ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        )}
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
