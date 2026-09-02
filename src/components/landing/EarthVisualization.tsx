import React, { useState, Suspense, lazy } from 'react';
import { Globe, RefreshCw } from 'lucide-react';

// Lazy-load Spline React component for optimal initial page performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export interface EarthVisualizationProps {
  className?: string;
  sceneUrl?: string;
}

export const EarthVisualization: React.FC<EarthVisualizationProps> = ({
  className = '',
  sceneUrl = 'https://prod.spline.design/RI-R4kDAxq-4D3ic/scene.splinecode',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div
      id="earth-visualization-container"
      className={`relative w-full rounded-xl border border-marine-700/60 bg-marine-900/60 shadow-xl overflow-hidden flex flex-col justify-center items-center ${className}`}
      style={{ minHeight: '360px', height: '480px' }}
    >
      {/* Center Spline 3D Scene Viewport */}
      <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
        {!hasError ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-marine-400 font-sans text-xs z-10">
                <div className="w-7 h-7 rounded-full border-2 border-marine-700 border-t-teal-400 animate-spin" />
                <span className="text-marine-400">Loading satellite visualization...</span>
              </div>
            }
          >
            {/* Loading Skeleton while Spline assets download */}
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-marine-400 font-sans text-xs z-10 bg-marine-900/80 backdrop-blur-xs">
                <div className="w-7 h-7 rounded-full border-2 border-marine-700 border-t-teal-400 animate-spin" />
                <span className="text-marine-300">Loading satellite visualization...</span>
              </div>
            )}

            <div
              className={`w-full h-full transition-opacity duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Spline
                scene={sceneUrl}
                onLoad={handleSplineLoad}
                onError={handleSplineError}
                className="w-full h-full"
              />
            </div>
          </Suspense>
        ) : (
          /* Clean Fallback if WebGL/Spline network fails */
          <div className="p-8 flex flex-col items-center justify-center text-center max-w-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-marine-800 border border-marine-700 flex items-center justify-center text-teal-400">
              <Globe className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-marine-200 block">Satellite Observation Scene</span>
              <span className="text-marine-400 text-xs block">
                Continuous synthetic aperture radar coverage across marine observation corridors.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                setIsLoaded(false);
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
