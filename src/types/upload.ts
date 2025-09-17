// FileUploadConfig is imported from environment types

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  processingStatus?: 'pending' | 'processing' | 'completed' | 'failed' | 'skipped';
  errors?: string[];
}

export interface UnifiedUploadResponse {
  success: boolean;
  message: string;
  data: {
    files?: Array<{
      fileId: string;
      fileName: string;
      fileSize: number;
      processingStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'skipped';
    }>;
    text?: {
      content: string;
      length: number;
      processed: boolean;
    };
  };
  summary: {
    totalFiles: number;
    totalTextLength: number;
    hasFiles: boolean;
    hasText: boolean;
  };
  errors?: string[];
}

export interface PythonServiceResponse {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: string[];
  processingTime?: number;
}

export interface UploadMetadata {
  userId?: string;
  clinicId?: string;
  uploadTimestamp: Date;
  fileType: string;
  fileSize: number;
  originalName: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
}

export type SupportedFileType =
  | 'application/pdf'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'text/csv'
  | 'application/json'
  | 'text/plain'
  | 'image/jpeg'
  | 'image/png'
  | 'image/tiff';

export interface FileUploadLimits {
  maxFileSize: number;
  maxFiles: number;
  uploadTimeout: number;
}
