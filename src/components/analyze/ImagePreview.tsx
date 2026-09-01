import React, { useState } from 'react';
import { 
  FileImage, 
  Trash2, 
  RefreshCw, 
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button } from '../common/Button';

export interface ImagePreviewProps {
  file: File;
  previewUrl: string;
  onRemove: () => void;
  onChangeFile: () => void;
  disabled?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  previewUrl,
  onRemove,
  onChangeFile,
  disabled = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));

  return (
    <div className="bg-marine-900 border border-marine-700/80 rounded-lg overflow-hidden shadow-console text-left">
      
      {/* Top File Header */}
      <div className="p-4 border-b border-marine-750 flex flex-wrap items-center justify-between gap-3 bg-marine-850">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400 shrink-0">
            <FileImage className="w-4 h-4" />
          </div>
          <div className="min-w-0 truncate">
            <h4 className="text-xs sm:text-sm font-semibold text-marine-100 truncate">
              {file.name}
            </h4>
            <p className="text-[11px] font-mono text-marine-400">
              {formatFileSize(file.size)} • Type: {file.type || 'image/raster'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onChangeFile}
            disabled={disabled}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Change
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={onRemove}
            disabled={disabled}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Main Image Viewport with Coordinate Grid */}
      <div className="relative w-full aspect-video bg-marine-950 flex items-center justify-center overflow-hidden p-2">
        {/* Cartographic Coordinate Overlay Grid */}
        <div className="absolute inset-0 maritime-grid opacity-30 pointer-events-none z-10" />

        {/* Zoom Controls */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-marine-900/90 border border-marine-700/80 rounded p-1 shadow-md">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 text-marine-300 hover:text-white rounded hover:bg-marine-800"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-marine-300 px-1.5">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 text-marine-300 hover:text-white rounded hover:bg-marine-800"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Raster Image */}
        <div
          className="transition-transform duration-150 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={previewUrl}
            alt="Uploaded SAR or Satellite Scene Preview"
            className="max-h-[380px] w-auto object-contain rounded border border-marine-750 shadow-lg"
          />
        </div>
      </div>

      {/* Raster Metadata Telemetry Strip */}
      <div className="p-4 bg-marine-850 border-t border-marine-750 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div>
          <span className="text-[10px] text-marine-400 block uppercase">Sensor Preset</span>
          <span className="text-marine-200 font-medium">Sentinel-1 C-SAR</span>
        </div>
        <div>
          <span className="text-[10px] text-marine-400 block uppercase">Polarization</span>
          <span className="text-marine-200 font-medium">VV (Co-Pol)</span>
        </div>
        <div>
          <span className="text-[10px] text-marine-400 block uppercase">Spatial Datum</span>
          <span className="text-teal-300 font-medium">WGS 84 / UTM 43N</span>
        </div>
        <div>
          <span className="text-[10px] text-marine-400 block uppercase">File Hash</span>
          <span className="text-marine-300 font-medium truncate block">
            {file.name.slice(0, 10)}...sha256
          </span>
        </div>
      </div>

    </div>
  );
};
