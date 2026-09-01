import React from 'react';
import { Radio, Compass, Orbit, ShieldCheck } from 'lucide-react';

export interface MarineSceneProps {
  className?: string;
}

/**
 * MarineScene Component
 * 
 * DESIGNED FOR MODULAR SPLINE 3D INTEGRATION:
 * This component acts as the isolated viewport container for the future 3D ocean scene
 * (including SAR satellite observation, vessel trajectory, and ocean slick visualization).
 * 
 * To mount Spline 3D later:
 * 1. Install @splinetool/react-spline
 * 2. Replace the inner preview layer with <Spline scene="YOUR_SPLINE_URL" />
 * No surrounding hero layout modifications will be required.
 */
export const MarineScene: React.FC<MarineSceneProps> = ({ className = '' }) => {
  return (
    <div
      id="marine-scene-viewport"
      className={`relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] rounded-lg border border-marine-600/70 bg-marine-900 overflow-hidden select-none shadow-2xl flex flex-col justify-between p-4 sm:p-5 ${className}`}
    >
      {/* Background Cartographic & SAR Swath Grid */}
      <div className="absolute inset-0 maritime-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-marine-700/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-teal-300 font-semibold">
            SAR OBSERVATION ZONE 04-A
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-marine-400">
          <span className="hidden sm:inline-flex items-center gap-1">
            <Orbit className="w-3 h-3 text-marine-300" /> SENTINEL-1 C-BAND
          </span>
          <span className="inline-flex items-center gap-1 bg-marine-800 px-2 py-0.5 rounded border border-marine-700">
            <Compass className="w-3 h-3 text-teal-400" /> 18°54′N 72°49′E
          </span>
        </div>
      </div>

      {/* Center 3D Integration Slot (Future Spline Mount Area) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 text-center">
        {/* Subtle Radar Scanner Ring */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-marine-700/80 flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-marine-600/40 border-dashed" />
          <div className="absolute inset-8 rounded-full border border-teal-900/40" />
          <div className="radar-sweep-line opacity-40" />
          
          {/* Central Satellite & Vessel Attribution Nodes */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-marine-800 border border-teal-500/50 flex items-center justify-center shadow-lg">
              <Radio className="w-5 h-5 text-teal-400" />
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs font-mono font-medium text-marine-200 block">
                3D SIMULATION CONTAINER
              </span>
              <span className="text-[10px] font-mono text-marine-400 block mt-0.5">
                Spline 3D Scene Target [Ready]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Metadata Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-marine-700/60 font-mono text-[10px] text-marine-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-marine-300">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            GROUND RESOLUTION: 10m/px
          </span>
          <span className="hidden md:inline text-marine-500">|</span>
          <span className="hidden md:inline text-marine-400">POLARIZATION: VV + VH</span>
        </div>

        <div className="bg-marine-800/80 px-2 py-0.5 rounded border border-marine-700/80 text-teal-300">
          STATUS: STANDBY FOR INGEST
        </div>
      </div>
    </div>
  );
};
