import React from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/useAuth';
import { firebaseConfig } from '../config/firebase';
import { Database, ShieldCheck, User } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="border-b border-marine-750 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
            Console Preferences
          </span>
        </div>
        <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
          Workstation & Sensor Settings
        </h1>
        <p className="text-xs sm:text-sm text-marine-300 mt-1">
          Configure sensor ingest endpoints, connected Firebase console database, and notification thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Endpoints & Authentication */}
        <div className="lg:col-span-6 space-y-5">
          <Card title="Firebase Cloud Database & Auth" subtitle="Live Console Connection">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-marine-850 rounded border border-marine-750">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-400" />
                    <span className="font-semibold text-marine-200">Firebase Project</span>
                  </div>
                  <div className="font-mono text-[11px] text-marine-400">
                    ID: {firebaseConfig.projectId || 'gen-lang-client-0162934680'}
                  </div>
                </div>
                <Badge variant="ready" size="sm" dot>CONNECTED</Badge>
              </div>

              {user && (
                <div className="p-3 bg-marine-850 rounded border border-marine-750 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-teal-400" />
                      <span className="font-medium text-marine-200">Active Operator Session</span>
                    </div>
                    <Badge variant="teal" size="sm">{user.role.toUpperCase()}</Badge>
                  </div>
                  <div className="text-[11px] font-mono text-marine-300 space-y-0.5">
                    <div>• Name: {user.displayName}</div>
                    <div>• Email: {user.email}</div>
                    <div>• Organization: {user.organization || 'Coast Surveillance Bureau'}</div>
                    <div>• Clearance: {user.clearanceLevel || 'Level 2'}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card title="Backend API Configuration" subtitle="FastAPI Microservice Connection">
            <div className="space-y-4">
              <Input
                label="FastAPI Base URL"
                defaultValue="http://localhost:8000/api/v1"
                helperText="Backend endpoint for ML inference and AIS processing"
              />
              <Input
                label="AIS Stream Ingest URI"
                defaultValue="wss://stream.marineguard.gov.in/ais/live"
                helperText="WebSocket feed for live coastal transponder feeds"
              />
              <div className="pt-2 flex justify-end">
                <Button size="sm" variant="primary">
                  Save API Config
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Thresholds & Cartography */}
        <div className="lg:col-span-6 space-y-5">
          <Card title="Detection Sensitivity Thresholds" subtitle="AI False Positive Suppression">
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between text-marine-300">
                  <span>Confidence Acceptance Threshold:</span>
                  <span className="text-teal-400 font-bold">85%</span>
                </div>
                <div className="w-full bg-marine-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[85%] rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-marine-300">
                  <span>Look-Alike Rejection Sensitivity:</span>
                  <span className="text-teal-400 font-bold">High (0.90)</span>
                </div>
                <div className="w-full bg-marine-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[90%] rounded-full" />
                </div>
              </div>

              <div className="pt-2 text-marine-400 font-sans text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Fine-tune confidence bands for SAR C-band dampening classification.</span>
              </div>
            </div>
          </Card>

          <Card title="Cartographic Datum" subtitle="Geographic Coordinate System">
            <div className="space-y-2 text-xs font-mono text-marine-300">
              <div className="flex justify-between py-1 border-b border-marine-800">
                <span className="text-marine-400">Default Projection:</span>
                <span>WGS 84 (EPSG:4326)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-marine-800">
                <span className="text-marine-400">UTM Zone Auto-Detect:</span>
                <span className="text-emerald-400">ENABLED</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-marine-400">Units:</span>
                <span>Nautical Miles / km²</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
