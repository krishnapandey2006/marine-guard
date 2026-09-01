import React from 'react';
import { Download, Plus } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marine-750 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
              Forensic Evidence Dossiers
            </span>
          </div>
          <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
            Investigation & Compliance Reports
          </h1>
          <p className="text-xs sm:text-sm text-marine-300 mt-1">
            Generate chain-of-custody certified documentation for environmental authorities and maritime law enforcement.
          </p>
        </div>

        <Button size="sm" variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Create New Dossier
        </Button>
      </div>

      {/* Reports Shell Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card title="DOSSIER-2026-MG-089" subtitle="Bombay High Offshore Sector • Sentinel-1 SAR">
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-marine-850 rounded border border-marine-750 font-mono space-y-1.5 text-marine-300">
              <div className="flex justify-between">
                <span className="text-marine-400">Classification:</span>
                <span className="text-amber-400 font-semibold">SUSPECTED CRUDE DISCHARGE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marine-400">Geo-Coordinates:</span>
                <span>19.4230°N, 71.3050°E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marine-400">Digital Seal:</span>
                <span className="text-teal-300 font-mono">0x4F8A...B21C [VALID]</span>
              </div>
            </div>

            <p className="text-marine-300 text-xs leading-relaxed">
              Standardized forensic dossier containing SAR radar imagery, surface roughness attenuation logs, candidate vessel transponder history, and officer sign-off.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-marine-750">
              <Badge variant="ready" size="sm" dot>SEALED</Badge>
              <Button size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
                Export PDF
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Dossier Generator Template" subtitle="Automated Legal Template Configuration">
          <div className="space-y-3 text-xs text-marine-300">
            <p className="leading-relaxed">
              Dossiers are assembled with ISO 14001 and MARPOL Annex I compliance standards, incorporating digital cryptographic hashing to ensure chain of custody.
            </p>

            <div className="p-3 bg-marine-850 rounded border border-marine-750 font-mono space-y-1 text-marine-400">
              <div>• Section 1: Satellite Scene Acquisition Metadata</div>
              <div>• Section 2: AI Segmentation & SMR Boundary Map</div>
              <div>• Section 3: AIS Vessel Spatio-Temporal Intersect</div>
              <div>• Section 4: Lead Investigator Attestation</div>
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
};
