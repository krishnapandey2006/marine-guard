import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  ArrowRight, 
  Satellite, 
  Radio, 
  FileCheck2, 
  Info,
  Layers,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/useAuth';
import { analysisService } from '../services/api/analysisService';
import type { SatelliteImageMetadata } from '../types/analysis';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [recentAnalyses, setRecentAnalyses] = useState<SatelliteImageMetadata[]>([]);

  useEffect(() => {
    analysisService.getAnalysisHistory().then((data) => {
      setRecentAnalyses(data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left">
      
      {/* Welcome & Primary Action Card */}
      <div className="bg-marine-900 border border-marine-700/80 rounded-lg p-6 sm:p-8 shadow-console">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-700/50">
                Workstation Online
              </span>
              <span className="text-xs font-mono text-marine-400">
                Operator: {user?.displayName || 'Analyst'} • {user?.organization || 'Surveillance Command'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-marine-50 tracking-tight">
              Welcome back, {user?.displayName || 'Analyst'}
            </h1>
            <p className="text-sm text-marine-300 max-w-2xl">
              The workstation is ready for satellite and SAR imagery analysis. Ingest high-resolution SAR scenes to initiate automated slick detection and subsequent AIS vessel correlation.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Link to="/analyze">
              <Button
                size="lg"
                variant="primary"
                leftIcon={<ScanSearch className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md"
              >
                START NEW ANALYSIS
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Step Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card
          title="1. Satellite SAR Ingest"
          subtitle="Sentinel-1 / Optical Imagery"
          className="hover:border-marine-600 transition-colors"
        >
          <div className="space-y-3">
            <p className="text-xs text-marine-300 leading-relaxed">
              Upload raw satellite TIFF or raster scenes. The upload engine extracts coordinate boundaries and validates scene integrity.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-teal-400 flex items-center gap-1">
                <Satellite className="w-3.5 h-3.5" /> Ready for Ingest
              </span>
              <Link to="/analyze" className="text-xs text-marine-300 hover:text-white flex items-center gap-1 font-medium">
                Upload <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        <Card
          title="2. Vessel Attribution"
          subtitle="Historical AIS Kinematics"
          className="hover:border-marine-600 transition-colors"
        >
          <div className="space-y-3">
            <p className="text-xs text-marine-300 leading-relaxed">
              Correlate verified spill polygons against historical AIS broadcasts to identify passing tankers and cargo vessels.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-sky-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> Pipeline Module
              </span>
              <Link to="/investigation" className="text-xs text-marine-300 hover:text-white flex items-center gap-1 font-medium">
                Inspect <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        <Card
          title="3. Investigation Reports"
          subtitle="Forensic Evidence Dossiers"
          className="hover:border-marine-600 transition-colors"
        >
          <div className="space-y-3">
            <p className="text-xs text-marine-300 leading-relaxed">
              Generate chain-of-custody PDF dossiers with spill geometry, timestamped AIS records, and legal-grade incident summaries.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" /> Dossier Generator
              </span>
              <Link to="/reports" className="text-xs text-marine-300 hover:text-white flex items-center gap-1 font-medium">
                View <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Clean Recent Activity / Pipeline Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Analyses Stream */}
        <div className="lg:col-span-8 space-y-4">
          <Card
            title="Recent Analyses"
            subtitle="Archive of processed satellite scenes and active investigations"
            headerAction={
              <Link to="/history" className="text-xs font-mono text-teal-400 hover:text-teal-300">
                View Full Archive →
              </Link>
            }
          >
            <div className="space-y-2.5">
              {recentAnalyses.length === 0 ? (
                <div className="p-4 text-center text-marine-400 font-mono text-xs">
                  Loading analyses from Firestore database...
                </div>
              ) : (
                recentAnalyses.map((item) => (
                  <div key={item.id} className="p-3.5 rounded bg-marine-850 border border-marine-700/70 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-marine-100">
                            {item.filename}
                          </span>
                          <Badge variant={item.sensorType === 'SAR_SENTINEL_1' ? 'teal' : 'neutral'} size="sm">
                            {item.sensorType || 'SENTINEL-1 SAR'}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-mono text-marine-400 mt-0.5">
                          Acquired {item.acquisitionDate ? new Date(item.acquisitionDate).toLocaleDateString() : 'Recent'} • Lat {item.centerCoordinate?.lat.toFixed(2) || '19.42'}°N, Lon {item.centerCoordinate?.lng.toFixed(2) || '71.30'}°E
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <Badge variant="ready" size="sm" dot>VERIFIED</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right: Telemetry & Pipeline Readiness */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="System Readiness" subtitle="Surveillance infrastructure health">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">Firebase Firestore</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> CONNECTED
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">Authentication</span>
                <span className="text-emerald-400 font-semibold">AUTHENTICATED</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">FastAPI ML Bridge</span>
                <span className="text-sky-400">READY TO ATTACH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-marine-300">Surveillance Node</span>
                <span className="text-teal-400">ACTIVE ({user?.clearanceLevel || 'Level 2'})</span>
              </div>

              <div className="mt-4 p-3 bg-marine-850 rounded border border-marine-700/60 font-sans text-xs text-marine-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  User accounts and satellite scene analyses are automatically synchronized with your Firebase Console database.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
