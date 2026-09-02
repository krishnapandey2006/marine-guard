import React, { useState, useEffect } from 'react';
import { Filter, Layers, ArrowUpRight, Loader2, Database } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { analysisService } from '../services/api/analysisService';
import type { SatelliteImageMetadata } from '../types/analysis';

export const HistoryPage: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<SatelliteImageMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const records = await analysisService.getAnalysisHistory();
        setHistoryItems(records);
      } catch (err) {
        console.error('History fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marine-750 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 flex items-center gap-1">
              <Database className="w-3.5 h-3.5" /> Surveillance Records
            </span>
          </div>
          <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
            Analysis History & Satellite Archive
          </h1>
          <p className="text-xs sm:text-sm text-marine-300 mt-1">
            Real-time repository of all ingested SAR scenes, spill classification runs, and Firestore database logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter Archive
          </Button>
        </div>
      </div>

      {/* Archive Shell Table / Cards */}
      <Card title="Historical Surveillance Log" subtitle="Persistent records synced with Firebase Firestore database">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-marine-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
            <span className="text-xs font-mono">Syncing telemetry logs from Firestore...</span>
          </div>
        ) : historyItems.length === 0 ? (
          <div className="p-8 text-center text-marine-400 font-mono text-xs">
            No analysis records yet. Ingest an image in the Analysis console to record your first investigation.
          </div>
        ) : (
          <div className="space-y-3">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-marine-850 rounded-md border border-marine-700/70 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-marine-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-marine-100">
                        {item.filename}
                      </span>
                      <Badge variant={item.sensorType === 'SAR_SENTINEL_1' ? 'teal' : 'neutral'} size="sm">
                        {item.sensorType || 'SENTINEL-1 SAR'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-marine-400">
                      <span>
                        Coordinates: {item.centerCoordinate ? `${item.centerCoordinate.lat.toFixed(2)}°N, ${item.centerCoordinate.lng.toFixed(2)}°E` : '19.42°N, 71.30°E'}
                      </span>
                      <span>
                        Ingested: {item.acquisitionDate ? new Date(item.acquisitionDate).toLocaleDateString() : 'Recent'}
                      </span>
                      <span>ID: {item.id}</span>
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
            ))}
          </div>
        )}
      </Card>

    </div>
  );
};
