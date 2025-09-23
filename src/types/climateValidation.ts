/**
 * Climate Risk Document Validation Types
 * Comprehensive validation system for climate risk documents (.pdf, .csv, .txt, .docx, .xlsx)
 */

export interface ClimateDocumentMetadata {
  fileName: string;
  fileType: 'pdf' | 'csv' | 'txt' | 'docx' | 'xlsx';
  fileSize: number;
  mimeType: string;
  uploadTimestamp: Date;
}

export interface ClimateValidationResult {
  isValid: boolean;
  errors: ClimateValidationError[];
  warnings: ClimateValidationWarning[];
  metadata: ClimateDocumentMetadata;
}

export interface ClimateValidationError {
  code: string;
  message: string;
  severity: 'error' | 'critical';
  field?: string;
  line?: number;
  column?: number;
  suggestion?: string;
}

export interface ClimateValidationWarning {
  code: string;
  message: string;
  severity: 'warning' | 'info';
  field?: string;
  suggestion?: string;
}

export interface ClimateFileValidationConfig {
  // Basic file validation - simplified for middleware
  pdfValidation: {
    enabled: boolean;
    maxFileSize: number;
  };
  csvValidation: {
    enabled: boolean;
    maxFileSize: number;
  };
  txtValidation: {
    enabled: boolean;
    maxFileSize: number;
  };
  docxValidation: {
    enabled: boolean;
    maxFileSize: number;
  };
  xlsxValidation: {
    enabled: boolean;
    maxFileSize: number;
  };
}

// Extend Express Request interface to include climate validation results
declare module 'express-serve-static-core' {
  interface Request {
    climateValidationResults?: ClimateValidationResult[];
  }
}
