import React from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const SettingsPage: React.FC = () => {
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
          Configure sensor ingest endpoints, FastAPI backend URL, and notification thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Endpoints & Authentication */}
        <div className="lg:col-span-6 space-y-5">
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

          <Card title="Firebase Authentication Mode" subtitle="Identity Provider Settings">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-marine-850 rounded border border-marine-750">
                <div>
                  <span className="font-semibold text-marine-200 block">Development Mode</span>
                  <span className="text-marine-400 text-[11px]">Interactive local session active</span>
                </div>
                <Badge variant="ready" size="sm">ACTIVE</Badge>
              </div>
              <p className="text-marine-400 text-[11px]">
                To attach live Firebase Auth, populate <code className="text-teal-300">VITE_FIREBASE_API_KEY</code> and related variables in <code className="text-teal-300">.env.local</code>.
              </p>
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

              <div className="pt-2 text-marine-400 font-sans text-xs">
                Fine-tune confidence bands for SAR C-band dampening classification.
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
