import React, { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { UploadCloud, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export interface UploadPanelProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onFileSelect, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.tif', '.tiff'];
  const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/x-tiff'];

  const validateAndProcessFile = (file: File) => {
    setDragError(null);
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = acceptedExtensions.some((ext) => fileNameLower.endsWith(ext));
    const hasValidMime = acceptedMimeTypes.includes(file.type) || hasValidExt;

    if (!hasValidExt && !hasValidMime) {
      setDragError('Unsupported file type. Please upload a GeoTIFF (.tif, .tiff), PNG, or JPG satellite image.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setDragError('File size exceeds 50MB limit. For larger SAR swaths, downsample or tile the raster.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-teal-400 bg-teal-950/40 scale-[0.99]'
            : 'border-marine-600/70 bg-marine-900/80 hover:border-marine-500 hover:bg-marine-850'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.tif,.tiff"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 maritime-grid opacity-20 pointer-events-none rounded-lg" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div className="space-y-1 max-w-md">
            <h3 className="text-base sm:text-lg font-bold text-marine-100">
              Drag & Drop Satellite / SAR Scene
            </h3>
            <p className="text-xs sm:text-sm text-marine-400">
              or <span className="text-teal-400 font-semibold underline">browse files</span> from your local filesystem
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-marine-400">
            <span className="px-2 py-0.5 rounded bg-marine-800 border border-marine-700">GeoTIFF (.tif, .tiff)</span>
            <span className="px-2 py-0.5 rounded bg-marine-800 border border-marine-700">PNG</span>
            <span className="px-2 py-0.5 rounded bg-marine-800 border border-marine-700">JPEG</span>
            <span className="text-marine-500">Max size: 50MB</span>
          </div>
        </div>
      </div>

      {dragError && (
        <div className="p-3 bg-red-950/70 border border-red-800/80 rounded flex items-center gap-2 text-xs text-red-200">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>{dragError}</span>
        </div>
      )}

      {/* Quick Demo Pre-load Selector for Testing */}
      <div className="p-3.5 bg-marine-850 rounded border border-marine-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-marine-300 font-mono">
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Need a test satellite scene?</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const canvas = document.createElement('canvas');
              canvas.width = 640;
              canvas.height = 480;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#0F1A24';
                ctx.fillRect(0, 0, 640, 480);
                for (let i = 0; i < 500; i++) {
                  ctx.fillStyle = Math.random() > 0.5 ? '#172738' : '#0B131C';
                  ctx.fillRect(Math.random() * 640, Math.random() * 480, 4, 4);
                }
                ctx.fillStyle = '#060B10';
                ctx.beginPath();
                ctx.ellipse(320, 240, 110, 35, Math.PI / 4, 0, 2 * Math.PI);
                ctx.fill();
                canvas.toBlob((blob) => {
                  if (blob) {
                    const testFile = new File([blob], 'SENTINEL1_SAR_OFFSHORE_TEST_SCENE.png', { type: 'image/png' });
                    onFileSelect(testFile);
                  }
                }, 'image/png');
              }
            }}
            className="px-3 py-1 bg-marine-800 hover:bg-marine-750 border border-marine-600 rounded text-teal-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Load Sample SAR Scene
          </button>
        </div>
      </div>
    </div>
  );
};
