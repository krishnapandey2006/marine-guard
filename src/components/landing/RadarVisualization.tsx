import React, { useState } from 'react';
import { Radio, RefreshCw } from 'lucide-react';

export interface RadarVisualizationProps {
  className?: string;
  embedUrl?: string;
  activeStep?: string;
}

export const RadarVisualization: React.FC<RadarVisualizationProps> = ({
  className = '',
  embedUrl = 'https://my.spline.design/hanaradar-ubFckdYfDNKNPDj9KLVjLtlC-Ix9/',
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      id="radar-visualization-container"
      className={`relative w-full rounded-xl border border-marine-700/60 bg-marine-900/60 shadow-xl overflow-hidden flex flex-col justify-center items-center ${className}`}
      style={{ minHeight: '380px', height: '480px' }}
    >
      {/* Center 3D Spline Radar Embed Viewport */}
      <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
        {!hasError ? (
          <>
            {/* Loading Skeleton */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-marine-400 font-sans text-xs z-10 bg-marine-900/80 backdrop-blur-xs">
                <div className="w-7 h-7 rounded-full border-2 border-marine-700 border-t-teal-400 animate-spin" />
                <span className="text-marine-300">Loading maritime tracking scene...</span>
              </div>
            )}

            <iframe
              src={embedUrl}
              title="MarineGuard Maritime Radar Scene"
              className={`w-full h-full border-0 transition-opacity duration-700 ${
                isIframeLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsIframeLoaded(true)}
              onError={() => setHasError(true)}
              allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
              loading="lazy"
            />
          </>
        ) : (
          /* Clean Fallback view if embed fails */
          <div className="p-8 flex flex-col items-center justify-center text-center max-w-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400">
              <Radio className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-marine-200 block">AIS Vessel Correlation Scene</span>
              <span className="text-marine-400 text-xs block">
                Correlating historical transponder records against spatial slick coordinates.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                setIsIframeLoaded(false);
              }}
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-marine-800 hover:bg-marine-750 border border-marine-700 text-marine-200 text-xs transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reload Scene
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
