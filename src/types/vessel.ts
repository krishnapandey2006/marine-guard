import type { GeoCoordinate } from './analysis';

export interface AISPositionReport {
  timestamp: string;
  coordinate: GeoCoordinate;
  speedOverGroundKnots: number;
  courseOverGroundDegrees: number;
  navigationalStatus: string;
}

export interface VesselCandidate {
  mmsi: string;
  imo?: string;
  vesselName: string;
  flag: string;
  vesselType: 'Tanker' | 'Cargo' | 'Container' | 'Bulk Carrier' | 'Fishing' | 'Other';
  callsign?: string;
  closestApproachDistanceKm: number;
  timeOfClosestApproach: string;
  temporalDeltaHours: number;
  corroborationScore: number; // 0-100 attribution confidence
  trackHistory?: AISPositionReport[];
}

export interface VesselAttributionSession {
  analysisId: string;
  spillCentroid: GeoCoordinate;
  searchRadiusKm: number;
  timeWindowHours: number;
  candidates: VesselCandidate[];
  investigationStatus: 'PENDING' | 'IN_REVIEW' | 'FLAGGED_FOR_INSPECTION' | 'DISMISSED';
}
