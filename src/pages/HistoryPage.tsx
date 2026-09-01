import React from 'react';
import { Filter, Layers, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marine-750 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
              Surveillance Records
            </span>
          </div>
          <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
            Analysis History & Satellite Archive
          </h1>
          <p className="text-xs sm:text-sm text-marine-300 mt-1">
            Repository of all previously ingested SAR scenes, spill classification runs, and verification logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter Archive
          </Button>
        </div>
      </div>

      {/* Archive Shell Table / Cards */}
      <Card title="Historical Surveillance Log" subtitle="Firestore-ready structured telemetry archive">
        <div className="space-y-3">
          
          <div className="p-4 bg-marine-850 rounded-md border border-marine-700/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-marine-100">
                    S1A_IW_GRDH_1SDV_20260814T012359_BOMBAY_HIGH
                  </span>
                  <Badge variant="teal" size="sm">SENTINEL-1 SAR</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-marine-400">
                  <span>Coordinates: 19.42°N, 71.30°E</span>
                  <span>Ingested: 2026-08-14 01:24 UTC</span>
                  <span>Operator: Analyst K. Sharma</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Badge variant="ready" size="sm" dot>VERIFIED</Badge>
              <Button size="sm" variant="outline" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Details
              </Button>
            </div>
          </div>

          <div className="p-4 bg-marine-850 rounded-md border border-marine-700/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-marine-100">
                    S2B_MSIL2A_20260810T053000_CHENNAI_PORT_APPROACH
                  </span>
                  <Badge variant="neutral" size="sm">SENTINEL-2 OPTICAL</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-marine-400">
                  <span>Coordinates: 13.08°N, 80.32°E</span>
                  <span>Ingested: 2026-08-10 05:30 UTC</span>
                  <span>Operator: Analyst K. Sharma</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Badge variant="neutral" size="sm">ARCHIVED</Badge>
              <Button size="sm" variant="outline" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Details
              </Button>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
};
