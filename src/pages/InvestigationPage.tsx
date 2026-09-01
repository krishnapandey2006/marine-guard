import React from 'react';
import { Ship } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const InvestigationPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marine-750 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
              Vessel Attribution Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
            Maritime Investigation & AIS Correlation
          </h1>
          <p className="text-xs sm:text-sm text-marine-300 mt-1">
            Correlate satellite detection polygons with historical Automatic Identification System (AIS) ship transponder records.
          </p>
        </div>

        <Badge variant="info" size="md">
          STEP 2 AIS PIPELINE
        </Badge>
      </div>

      {/* AIS Parameters & Status Console */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Spatio-Temporal Query" subtitle="Correlation Parameters">
          <div className="space-y-2 text-xs font-mono text-marine-300">
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">Search Radius:</span>
              <span>25.0 NM (46.3 km)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">Time Window:</span>
              <span>± 6.0 Hours</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-marine-400">Interpolation:</span>
              <span>Great Circle Kinematic</span>
            </div>
          </div>
        </Card>

        <Card title="Transponder Coverage" subtitle="Coastal Receiver Grid">
          <div className="space-y-2 text-xs font-mono text-marine-300">
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">Terrestrial AIS:</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">Satellite AIS:</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-marine-400">Dark Vessel Filter:</span>
              <span className="text-amber-400">ENABLED</span>
            </div>
          </div>
        </Card>

        <Card title="Corroboration Metric" subtitle="Scoring Architecture">
          <div className="space-y-2 text-xs font-mono text-marine-300">
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">CPA Proximity:</span>
              <span>40% Weight</span>
            </div>
            <div className="flex justify-between py-1 border-b border-marine-800">
              <span className="text-marine-400">Course Concordance:</span>
              <span>30% Weight</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-marine-400">Vessel Type Risk:</span>
              <span>30% Weight</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Structured Candidate Table Shell */}
      <Card
        title="Candidate Vessel Ledger"
        subtitle="Vessels identified within the target temporal slick corridor"
      >
        <div className="p-8 text-center bg-marine-850 rounded border border-marine-750/70 space-y-3">
          <div className="w-12 h-12 rounded-full bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 mx-auto">
            <Ship className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-sm font-bold text-marine-100">
              Awaiting Spill Geometry Selection
            </h3>
            <p className="text-xs text-marine-400">
              Select or analyze a satellite scene in the Analysis console. The detected slick polygon will trigger automated spatio-temporal queries against the AIS historical database in Step 2.
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
};
