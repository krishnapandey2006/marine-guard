import React from 'react';
import { EarthVisualization } from './EarthVisualization';

export interface MarineSceneProps {
  className?: string;
  sceneUrl?: string;
}

/**
 * MarineScene Component (Modular Spline 3D Earth Wrapper)
 */
export const MarineScene: React.FC<MarineSceneProps> = ({ className = '', sceneUrl }) => {
  return <EarthVisualization className={className} sceneUrl={sceneUrl} />;
};
