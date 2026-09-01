import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  ArrowRight, 
  Satellite, 
  Radio, 
  FileCheck2, 
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

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
                Operator ID: {user?.id || 'SEC-ANALYST'}
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
              <div className="p-3.5 rounded bg-marine-850 border border-marine-700/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-marine-100">
                        S1A_IW_GRDH_1SDV_BOMBAY_HIGH.tiff
                      </span>
                      <Badge variant="teal" size="sm">SENTINEL-1 SAR</Badge>
                    </div>
                    <p className="text-[11px] font-mono text-marine-400 mt-0.5">
                      Ingested 2 hours ago • Sensor: C-Band SAR • Lat 19.42°N, Lon 71.30°E
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <Badge variant="ready" size="sm" dot>READY FOR ML</Badge>
                </div>
              </div>

              <div className="p-3.5 rounded bg-marine-850 border border-marine-700/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-marine-100">
                        S2B_MSIL2A_CHENNAI_PORT_APPROACH.png
                      </span>
                      <Badge variant="neutral" size="sm">OPTICAL S2</Badge>
                    </div>
                    <p className="text-[11px] font-mono text-marine-400 mt-0.5">
                      Ingested yesterday • Multi-Spectral • Lat 13.08°N, Lon 80.32°E
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <Badge variant="neutral" size="sm">ARCHIVED</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Telemetry & Pipeline Readiness */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="System Readiness" subtitle="Surveillance infrastructure health">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">Frontend Workstation</span>
                <span className="text-emerald-400 font-semibold">ONLINE (STEP 1)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">FastAPI ML Bridge</span>
                <span className="text-sky-400">READY TO ATTACH</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-marine-750">
                <span className="text-marine-300">AIS Geo-Database</span>
                <span className="text-marine-400">STANDBY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-marine-300">Authentication</span>
                <span className="text-emerald-400">ACTIVE SESSION</span>
              </div>

              <div className="mt-4 p-3 bg-marine-850 rounded border border-marine-700/60 font-sans text-xs text-marine-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  No fake ML metrics are displayed. Ingest images in the Analysis console to trigger the frontend pipeline.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
