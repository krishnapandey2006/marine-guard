import React from 'react';
import { Satellite, Cpu, Radio, FileCheck, Check } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const techItems = [
    {
      title: 'Satellite & SAR Processing',
      subtitle: 'Earth Observation Ingestion',
      icon: Satellite,
      what: 'Direct ingestion of Synthetic Aperture Radar (Sentinel-1 C-Band) and optical satellite imagery in standard GeoTIFF raster formats.',
      why: 'SAR penetrates cloud cover and operates day or night to detect capillary wave dampening caused by surface hydrocarbons.',
      capabilities: [
        'Multi-format validation (GeoTIFF and raster formats)',
        'Automated geospatial metadata and CRS extraction',
        'Asynchronous client-side chunked telemetry ingestion',
      ],
    },
    {
      title: 'AI & Machine Learning Vision',
      subtitle: 'Roughness Segmentation Engine',
      icon: Cpu,
      what: 'Deep convolutional neural segmentation architectures to classify surface roughness anomalies and slick boundaries.',
      why: 'Suppresses false positives caused by natural biogenic films, low-wind calm waters, and oceanic upwelling zones.',
      capabilities: [
        'Semantic boundary delineation and perimeter vectorization',
        'Probabilistic oil slick vs. look-alike confidence scoring',
        'Precise centroid coordinates and area calculation',
      ],
    },
    {
      title: 'Historical AIS Vessel Attribution',
      subtitle: 'Spatio-Temporal Kinematic Matching',
      icon: Radio,
      what: 'Cross-references historical Automatic Identification System (AIS) transponder broadcasts within the detection corridor.',
      why: 'Identifies which commercial vessels were present in the immediate temporal and spatial vicinity of the slick.',
      capabilities: [
        'Closest Point of Approach (CPA) temporal indexing',
        'Vessel trajectory backtracking and speed analysis',
        'MMSI, IMO, vessel flag state, and metadata correlation',
      ],
    },
    {
      title: 'Chain-of-Custody Evidence Reporting',
      subtitle: 'Forensic Audit Dossier Generation',
      icon: FileCheck,
      what: 'Compiles structured, audit-ready investigation dossiers linking satellite imagery, slick bounds, and AIS records.',
      why: 'Provides legally defensible, tamper-evident forensic documentation for maritime law enforcement and port authorities.',
      capabilities: [
        'Standardized MARPOL compliance reporting format',
        'Cryptographic hash verification for incident records',
        'Exportable summary and raw geospatial data package',
      ],
    },
  ];

  return (
    <section
      id="technology"
      className="py-16 sm:py-24 border-b border-marine-800/80 bg-marine-900/30 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-marine-50 tracking-tight mt-2">
            Core Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-marine-300 mt-2.5 leading-relaxed">
            A modular system combining satellite radar processing, computer vision segmentation, and maritime kinematics.
          </p>
        </div>

        {/* 2x2 Structured Technology Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techItems.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-marine-900/50 border border-marine-800/80 hover:border-marine-700/80 rounded-xl p-6 flex flex-col justify-between transition-colors text-left"
              >
                <div>
                  {/* Top Bar: Icon + Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-marine-850 border border-marine-750 flex items-center justify-center text-teal-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-marine-100 tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-xs text-marine-400">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Scannable Breakdown: Function & Operational Impact */}
                  <div className="space-y-3 text-xs sm:text-sm text-marine-300 leading-relaxed mb-6">
                    <div>
                      <span className="text-xs font-medium text-marine-200 block mb-0.5">
                        Function
                      </span>
                      <p className="text-xs text-marine-300/90 leading-relaxed">{item.what}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-marine-200 block mb-0.5">
                        Operational Impact
                      </span>
                      <p className="text-xs text-marine-300/90 leading-relaxed">{item.why}</p>
                    </div>
                  </div>

                  {/* Key Capabilities Checklist */}
                  <div className="pt-4 border-t border-marine-800/80">
                    <span className="text-xs font-medium text-marine-400 uppercase tracking-wider block mb-2.5">
                      Key Capabilities
                    </span>
                    <ul className="space-y-2 text-xs text-marine-300">
                      {item.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span className="text-xs leading-relaxed text-marine-300">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
