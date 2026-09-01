export type PipelineStatus = 
  | 'IDLE' 
  | 'IMAGE_SELECTED' 
  | 'UPLOADING' 
  | 'PROCESSING' 
  | 'DETECTION_COMPLETE' 
  | 'ERROR';

export type SensorType = 'SAR_SENTINEL_1' | 'OPTICAL_SENTINEL_2' | 'LANDSAT_8_9' | 'GENERIC_RASTER';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface GeoPolygon {
  type: 'Polygon';
  coordinates: number[][][]; // GeoJSON format [lng, lat]
}

export interface SatelliteImageMetadata {
  id: string;
  filename: string;
  fileSize: number;
  fileType: string;
  width?: number;
  height?: number;
  sensorType?: SensorType;
  acquisitionDate?: string;
  centerCoordinate?: GeoCoordinate;
  previewUrl: string;
}

export interface DetectionResult {
  analysisId: string;
  spillDetected: boolean;
  confidenceScore: number; // 0.0 - 1.0 (from ML backend)
  estimatedAreaSqKm?: number;
  centroid?: GeoCoordinate;
  boundaryGeoJson?: GeoPolygon;
  lookAlikeScreening: {
    isLowWindArtifact: boolean;
    isBiogenicSlick: boolean;
    isCurrentRip: boolean;
    confidenceClean: number;
  };
  processedAt: string;
}

export interface AnalysisRecord {
  id: string;
  imageMetadata: SatelliteImageMetadata;
  status: PipelineStatus;
  createdAt: string;
  completedAt?: string;
  result?: DetectionResult;
  assignedAnalystId?: string;
  notes?: string;
}
