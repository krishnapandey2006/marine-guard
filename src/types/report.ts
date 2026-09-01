export interface EvidenceReport {
  reportId: string;
  analysisId: string;
  title: string;
  generatedAt: string;
  authorName: string;
  organization: string;
  incidentLocationDescription: string;
  summary: string;
  spillAreaEstimateSqKm: number;
  suspectedVesselMMSI?: string;
  suspectedVesselName?: string;
  confidenceRating: 'High' | 'Medium' | 'Low' | 'Inconclusive';
  status: 'DRAFT' | 'SEALED' | 'DISPATCHED_TO_AUTHORITIES';
  digitalSignatureHash?: string;
}
