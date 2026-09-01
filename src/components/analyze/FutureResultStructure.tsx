import React from 'react';
import { 
  MapPin, 
  Maximize, 
  ShieldCheck, 
  Ship, 
  Layers,
  Activity
} from 'lucide-react';
import type { DetectionResult } from '../../types/analysis';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export interface FutureResultStructureProps {
  result?: DetectionResult | null;
}

export const FutureResultStructure: React.FC<FutureResultStructureProps> = ({ 
  result
}) => {
  return (
    <div className="space-y-6 text-left">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-marine-750 pb-3">
        <div>
          <h3 className="text-lg font-bold text-marine-50 tracking-tight">
            Analysis & Attribution Matrix
          </h3>
          <p className="text-xs text-marine-400">
            Modular UI schema designed for FastAPI ML inference payload and AIS correlation.
          </p>
        </div>

        <Badge variant={result ? 'ready' : 'info'} size="sm">
          {result ? 'LIVE INFERENCE ATTACHED' : 'FASTAPI INTEGRATION SLOT (STEP 2)'}
        </Badge>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Detection Status */}
        <Card noPadding className="p-4 bg-marine-900 border-marine-700/70">
          <div className="flex items-center justify-between text-xs text-marine-400 font-mono mb-2">
            <span>DETECTION STATUS</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-lg font-bold text-marine-100">
            {result ? (result.spillDetected ? 'SPILL DETECTED' : 'CLEAN SEA SURFACE') : '—'}
          </div>
          <div className="text-[11px] text-marine-400 mt-1 font-mono">
            {result ? `Model: UNet-SAR-v1` : 'Awaiting FastAPI payload'}
          </div>
        </Card>

        {/* Confidence Rating */}
        <Card noPadding className="p-4 bg-marine-900 border-marine-700/70">
          <div className="flex items-center justify-between text-xs text-marine-400 font-mono mb-2">
            <span>MODEL CONFIDENCE</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-lg font-bold text-marine-100">
            {result ? `${(result.confidenceScore * 100).toFixed(1)}%` : '—'}
          </div>
          <div className="text-[11px] text-marine-400 mt-1 font-mono">
            {result ? 'Threshold: > 0.85' : 'Calibrated sigmoid output'}
          </div>
        </Card>

        {/* Estimated Spill Area */}
        <Card noPadding className="p-4 bg-marine-900 border-marine-700/70">
          <div className="flex items-center justify-between text-xs text-marine-400 font-mono mb-2">
            <span>ESTIMATED AREA</span>
            <Maximize className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-lg font-bold text-marine-100">
            {result?.estimatedAreaSqKm ? `${result.estimatedAreaSqKm.toFixed(2)} km²` : '—'}
          </div>
          <div className="text-[11px] text-marine-400 mt-1 font-mono">
            {result ? 'Calculated from SAR pixels' : 'Pixel-to-geodetic projection'}
          </div>
        </Card>

        {/* Geometric Centroid */}
        <Card noPadding className="p-4 bg-marine-900 border-marine-700/70">
          <div className="flex items-center justify-between text-xs text-marine-400 font-mono mb-2">
            <span>SPILL CENTROID</span>
            <MapPin className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-sm font-bold font-mono text-marine-100 truncate">
            {result?.centroid ? `${result.centroid.lat.toFixed(4)}°N, ${result.centroid.lng.toFixed(4)}°E` : '—'}
          </div>
          <div className="text-[11px] text-marine-400 mt-1 font-mono">
            {result ? 'Datum: WGS 84' : 'Geographic center point'}
          </div>
        </Card>

      </div>

      {/* Two Columns: Look-alike Screening & AIS Candidate Corridor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Look-alike Screening Card */}
        <Card
          title="False Positive & Look-Alike Screening"
          subtitle="Capillary wave dampening vs low-wind / biogenic film discrimination"
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded bg-marine-850 border border-marine-750">
              <span className="text-marine-300">Low-Wind Calm Sea Artifact</span>
              <span className="text-marine-400">{result ? (result.lookAlikeScreening.isLowWindArtifact ? 'FLAGGED' : 'CLEARED') : 'SLOT READY'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-marine-850 border border-marine-750">
              <span className="text-marine-300">Biogenic Film / Algal Bloom</span>
              <span className="text-marine-400">{result ? (result.lookAlikeScreening.isBiogenicSlick ? 'FLAGGED' : 'CLEARED') : 'SLOT READY'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-marine-850 border border-marine-750">
              <span className="text-marine-300">Current Rip / Oceanic Front</span>
              <span className="text-marine-400">{result ? (result.lookAlikeScreening.isCurrentRip ? 'FLAGGED' : 'CLEARED') : 'SLOT READY'}</span>
            </div>
          </div>
        </Card>

        {/* AIS Vessel Correlation Candidates */}
        <Card
          title="AIS Vessel Attribution Queue"
          subtitle="Spatio-temporal intersection with maritime transponder history"
        >
          <div className="space-y-2.5">
            <div className="p-3 bg-marine-850 rounded border border-marine-750 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Ship className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <span className="font-semibold text-marine-200">AIS Trajectory Correlation</span>
                  <p className="text-[10px] font-mono text-marine-400">
                    Radius: 25 km • Time window: ± 6.0 hours
                  </p>
                </div>
              </div>
              <Badge variant="neutral" size="sm">STEP 2 PIPELINE</Badge>
            </div>

            <div className="p-3.5 bg-marine-950/60 rounded border border-marine-800 text-xs text-marine-400 font-mono text-center">
              No artificial candidate vessels rendered. When the AIS microservice runs, matching ships (MMSI, IMO, closest approach distance) will appear here.
            </div>
          </div>
        </Card>

      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-marine-900 border border-marine-700 rounded-lg flex items-start gap-3 text-xs text-marine-300">
        <Layers className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-marine-100">Step 1 Architectural Boundary:</span>
          <p className="leading-relaxed text-marine-400">
            This results container is configured to receive the exact typed payload from <code className="text-teal-300">POST /analyze</code> (FastAPI) and Firebase Firestore without any frontend layout modifications.
          </p>
        </div>
      </div>

    </div>
  );
};
