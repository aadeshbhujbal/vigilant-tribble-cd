// API response and error types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: Date;
  requestId: string;
  version: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  field?: string;
  timestamp: Date;
  requestId: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  success: boolean;
  message: string;
  timestamp: Date;
  requestId: string;
}

export interface ProcessingResponse {
  submissionId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  estimatedTimeRemaining?: number;
  message: string;
  timestamp: Date;
  requestId: string;
}

export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  uploadStatus: 'success' | 'failed';
  message: string;
  processingQueueId?: string;
  timestamp: Date;
  requestId: string;
}

export interface ValidationError {
  field: string;
  value: unknown;
  message: string;
  code: string;
}

export interface ValidationResponse {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  timestamp: Date;
  requestId: string;
}
