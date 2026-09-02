import React, { useState, useEffect } from 'react';
import { 
  ScanEye, 
  ArrowRight, 
  RotateCcw 
} from 'lucide-react';
import { UploadPanel } from '../components/analyze/UploadPanel';
import { ImagePreview } from '../components/analyze/ImagePreview';
import { PipelineStateBar } from '../components/analyze/PipelineStateBar';
import { FutureResultStructure } from '../components/analyze/FutureResultStructure';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import type { PipelineStatus, DetectionResult } from '../types/analysis';
import { analysisService } from '../services/api/analysisService';

export const AnalyzePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DetectionResult | null>(null);

  useEffect(() => {
    return () => {
      // Clean up object URL when unmounting
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setPipelineStatus('IMAGE_SELECTED');
    setErrorMessage(null);
    setAnalysisResult(null);
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setPipelineStatus('IDLE');
    setErrorMessage(null);
    setAnalysisResult(null);
  };

  const handleTriggerAnalysis = async () => {
    if (!selectedFile) return;

    setPipelineStatus('UPLOADING');
    setErrorMessage(null);

    try {
      await new Promise((res) => setTimeout(res, 600));
      setPipelineStatus('PROCESSING');

      const res = await analysisService.uploadAndAnalyze({
        imageFile: selectedFile,
        sensorType: 'SAR_SENTINEL_1',
        acquisitionDate: new Date().toISOString(),
      });

      setAnalysisResult(res);
      setPipelineStatus('DETECTION_COMPLETE');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis pipeline execution failed';
      setErrorMessage(msg);
      setPipelineStatus('ERROR');
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marine-750 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
              Surveillance Console
            </span>
          </div>
          <h1 className="text-2xl font-bold text-marine-50 tracking-tight mt-1">
            Satellite & SAR Scene Analysis
          </h1>
          <p className="text-xs sm:text-sm text-marine-300 mt-1">
            Ingest radar or optical scenes to initialize automated slick delineation and candidate vessel indexing.
          </p>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRemoveFile}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Console
            </Button>
          </div>
        )}
      </div>

      {/* State Machine Status Bar */}
      <PipelineStateBar status={pipelineStatus} errorMessage={errorMessage} />

      {/* Primary Interaction Area */}
      {!selectedFile ? (
        <Card
          title="Satellite Scene Ingestion"
          subtitle="Drag and drop or select a high-resolution SAR/Optical image for processing"
        >
          <UploadPanel onFileSelect={handleFileSelect} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Image Preview & Sensor Telemetry */}
          <div className="lg:col-span-8 space-y-4">
            <ImagePreview
              file={selectedFile}
              previewUrl={previewUrl!}
              onRemove={handleRemoveFile}
              onChangeFile={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.jpg,.jpeg,.png,.tif,.tiff';
                input.onchange = (e: any) => {
                  if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                };
                input.click();
              }}
              disabled={pipelineStatus === 'UPLOADING' || pipelineStatus === 'PROCESSING'}
            />
          </div>

          {/* Right: Analysis Action Panel & Controls */}
          <div className="lg:col-span-4 space-y-4">
            <Card title="Pipeline Execution" subtitle="FastAPI Microservice Bridge">
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-marine-850 rounded border border-marine-750 font-mono space-y-2">
                  <div className="text-marine-400 uppercase text-[10px]">Target Endpoint</div>
                  <div className="text-teal-300 font-semibold truncate">POST /api/v1/analyze</div>
                  
                  <div className="text-marine-400 uppercase text-[10px] pt-1">Payload Specs</div>
                  <div className="text-marine-300 text-[11px] space-y-0.5">
                    <div>• Format: multipart/form-data</div>
                    <div>• Image: {selectedFile.name}</div>
                    <div>• Size: {(selectedFile.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleTriggerAnalysis}
                    isLoading={pipelineStatus === 'UPLOADING' || pipelineStatus === 'PROCESSING'}
                    disabled={pipelineStatus === 'DETECTION_COMPLETE'}
                    leftIcon={<ScanEye className="w-4 h-4" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    RUN ANALYSIS PIPELINE
                  </Button>

                  {pipelineStatus === 'ERROR' && (
                    <p className="text-[11px] text-amber-400 font-mono text-center">
                      Backend notice: In Step 1, FastAPI endpoint connection is verified through service layer.
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card title="Analysis Parameters" subtitle="Configured Sensor Filters">
              <div className="space-y-2 text-xs font-mono text-marine-300">
                <div className="flex justify-between py-1 border-b border-marine-800">
                  <span className="text-marine-400">Sensor Band:</span>
                  <span>Sentinel-1 C-SAR</span>
                </div>
                <div className="flex justify-between py-1 border-b border-marine-800">
                  <span className="text-marine-400">Min Slick Area:</span>
                  <span>0.05 km²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-marine-800">
                  <span className="text-marine-400">Look-Alike Filter:</span>
                  <span className="text-emerald-400">ENABLED</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-marine-400">AIS Correlator:</span>
                  <span className="text-sky-400">STANDBY</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      )}

      {/* Structured Result Container */}
      <FutureResultStructure result={analysisResult} />

    </div>
  );
};
