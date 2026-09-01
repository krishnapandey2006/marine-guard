import React from 'react';
import { CheckCircle2, Clock, Loader2, AlertTriangle, CircleDashed } from 'lucide-react';
import type { PipelineStatus } from '../../types/analysis';

export interface PipelineStateBarProps {
  status: PipelineStatus;
  errorMessage?: string | null;
}

export const PipelineStateBar: React.FC<PipelineStateBarProps> = ({ status, errorMessage }) => {
  const steps: { key: PipelineStatus; label: string; stage: number }[] = [
    { key: 'IDLE', label: 'Standby / Awaiting File', stage: 1 },
    { key: 'IMAGE_SELECTED', label: 'File Validated & Staged', stage: 2 },
    { key: 'UPLOADING', label: 'FastAPI Dispatch', stage: 3 },
    { key: 'PROCESSING', label: 'ML Inference & AIS Sync', stage: 4 },
    { key: 'DETECTION_COMPLETE', label: 'Analysis Complete', stage: 5 },
  ];

  const getStatusIndex = (s: PipelineStatus): number => {
    switch (s) {
      case 'IDLE': return 0;
      case 'IMAGE_SELECTED': return 1;
      case 'UPLOADING': return 2;
      case 'PROCESSING': return 3;
      case 'DETECTION_COMPLETE': return 4;
      case 'ERROR': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="bg-marine-900 border border-marine-750 rounded-lg p-4 font-mono text-xs shadow-console">
      <div className="flex items-center justify-between mb-3 border-b border-marine-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-marine-400">ANALYSIS PIPELINE STATE:</span>
          <span className="font-bold text-teal-400">
            {status === 'ERROR' ? 'SYSTEM EXCEPTION' : status}
          </span>
        </div>

        <div className="text-[11px] text-marine-400">
          ARCHITECTURE: FASTAPI + ML INFERENCE (STEP 2 READY)
        </div>
      </div>

      {status === 'ERROR' ? (
        <div className="p-3 bg-red-950/70 border border-red-800/80 rounded text-red-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage || 'An error occurred during pipeline execution.'}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
          {steps.map((step, idx) => {
            const isCompleted = currentIndex > idx;
            const isCurrent = currentIndex === idx;

            return (
              <div
                key={step.key}
                className={`p-2 rounded border transition-colors flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-teal-950/60 border-teal-500/70 text-teal-300'
                    : isCompleted
                    ? 'bg-marine-850 border-marine-700 text-marine-300'
                    : 'bg-marine-900/50 border-marine-800 text-marine-500'
                }`}
              >
                <div className="shrink-0">
                  {isCurrent ? (
                    step.key === 'UPLOADING' || step.key === 'PROCESSING' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400" />
                    ) : (
                      <CircleDashed className="w-3.5 h-3.5 text-teal-400" />
                    )
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-marine-600" />
                  )}
                </div>
                <span className="text-[11px] truncate leading-tight font-medium">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
