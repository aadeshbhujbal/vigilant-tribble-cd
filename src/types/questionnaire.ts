// Questionnaire and processing related types

export interface DocumentUpload {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: number;
  uploadedAt: Date;
  status: 'uploaded' | 'sent-to-python' | 'processing' | 'completed' | 'failed';
  pythonJobId?: string;
  error?: string;
}

export interface PythonProcessingRequest {
  id: string;
  documentIds: string[];
  organization: string;
  requestedAt: Date;
  status: 'pending' | 'sent' | 'processing' | 'completed' | 'failed';
  pythonResponse?: {
    questions: string[];
    responses: string[];
    citations: string[];
    processingTime: number;
  };
  error?: string;
}

export interface ProcessingStatus {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  estimatedTimeRemaining?: number;
  lastUpdated: Date;
  errors?: string[];
}

export interface ResultsExport {
  requestId: string;
  exportFormat: 'excel' | 'csv' | 'json';
  generatedAt: Date;
  downloadUrl: string;
  expiresAt: Date;
}
