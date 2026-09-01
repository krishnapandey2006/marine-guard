import { request } from './apiClient';
import type { DetectionResult, SatelliteImageMetadata } from '../../types/analysis';

export interface AnalysisPayload {
  imageFile: File;
  sensorType?: string;
  acquisitionDate?: string;
  notes?: string;
}

export interface IAnalysisService {
  uploadAndAnalyze(payload: AnalysisPayload, onProgress?: (progress: number) => void): Promise<DetectionResult>;
  getAnalysisHistory(): Promise<SatelliteImageMetadata[]>;
  getAnalysisById(id: string): Promise<DetectionResult | null>;
}

class AnalysisService implements IAnalysisService {
  /**
   * Future bridge to FastAPI endpoint: POST /analyze
   */
  async uploadAndAnalyze(payload: AnalysisPayload, _onProgress?: (progress: number) => void): Promise<DetectionResult> {
    const formData = new FormData();
    formData.append('image', payload.imageFile);
    if (payload.sensorType) formData.append('sensor_type', payload.sensorType);
    if (payload.acquisitionDate) formData.append('acquisition_date', payload.acquisitionDate);
    if (payload.notes) formData.append('notes', payload.notes);

    // If backend is active, this will trigger the real ML detection pipeline:
    try {
      return await request<DetectionResult>('/analyze', {
        method: 'POST',
        body: formData,
      });
    } catch {
      // Step 1 Fallback / Notice: Let the caller know the pipeline is awaiting backend connection
      throw new Error('Analysis pipeline ready. FastAPI backend service (/api/v1/analyze) is pending connection in Step 2.');
    }
  }

  async getAnalysisHistory(): Promise<SatelliteImageMetadata[]> {
    try {
      return await request<SatelliteImageMetadata[]>('/history');
    } catch {
      return [];
    }
  }

  async getAnalysisById(id: string): Promise<DetectionResult | null> {
    try {
      return await request<DetectionResult>(`/analysis/${id}`);
    } catch {
      return null;
    }
  }
}

export const analysisService = new AnalysisService();
