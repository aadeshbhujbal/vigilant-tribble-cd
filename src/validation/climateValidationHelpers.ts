import type { Express } from 'express';
import type {
  ClimateValidationError,
  ClimateValidationWarning,
  ClimateFileValidationConfig,
} from '../types/climateValidation';

/**
 * Check PDF header
 */
export const checkPDFHeader = (buffer: Buffer, errors: ClimateValidationError[]): boolean => {
  const header = buffer.toString('ascii', 0, 4);
  if (header !== '%PDF') {
    errors.push({
      code: 'INVALID_PDF_FORMAT',
      message: 'File does not appear to be a valid PDF document',
      severity: 'error',
      suggestion: 'Please ensure the file is a valid PDF document',
    });
    return false;
  }
  return true;
};

/**
 * Check for password protection in PDF
 */
export const checkPDFPasswordProtection = (
  buffer: Buffer,
  errors: ClimateValidationError[],
): void => {
  const content = buffer.toString('ascii', 0, Math.min(1024, buffer.length));
  if (content.includes('/Encrypt')) {
    errors.push({
      code: 'PASSWORD_PROTECTED_PDF',
      message: 'PDF file is password protected and cannot be processed',
      severity: 'error',
      suggestion: 'Please provide an unprotected PDF version',
    });
  }
};

/**
 * Check CSV content structure
 */
export const checkCSVContent = (
  content: string,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  const lines = content.split('\n').filter(line => line.trim().length > 0);

  if (lines.length === 0) {
    errors.push({
      code: 'EMPTY_CSV',
      message: 'CSV file is empty',
      severity: 'error',
      suggestion: 'Please provide a CSV file with data',
    });
    return;
  }

  // Basic structure check - ensure it has at least a header
  if (lines.length < 2) {
    _warnings.push({
      code: 'CSV_MINIMAL_DATA',
      message: 'CSV file has minimal data (only header or single row)',
      severity: 'warning',
      suggestion: 'Ensure the CSV contains sufficient data for analysis',
    });
  }
};

/**
 * Check TXT content structure
 */
export const checkTXTContent = (
  content: string,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  const { length } = content;

  if (length === 0) {
    errors.push({
      code: 'EMPTY_TXT',
      message: 'Text file is empty',
      severity: 'error',
      suggestion: 'Please provide a text file with content',
    });
    return;
  }

  if (length < 50) {
    _warnings.push({
      code: 'TXT_TOO_SHORT',
      message: 'Text file appears to be very short',
      severity: 'warning',
      suggestion: 'Ensure the document contains sufficient content for analysis',
    });
  }
};

/**
 * Check DOCX ZIP header
 */
export const checkDOCXHeader = (buffer: Buffer, errors: ClimateValidationError[]): void => {
  const header = buffer.toString('ascii', 0, 2);
  if (header !== 'PK') {
    errors.push({
      code: 'INVALID_DOCX_FORMAT',
      message: 'File does not appear to be a valid DOCX document',
      severity: 'error',
      suggestion: 'Please ensure the file is a valid DOCX document',
    });
  }
};

/**
 * Check XLSX ZIP header
 */
export const checkXLSXHeader = (buffer: Buffer, errors: ClimateValidationError[]): void => {
  const header = buffer.toString('ascii', 0, 2);
  if (header !== 'PK') {
    errors.push({
      code: 'INVALID_XLSX_FORMAT',
      message: 'File does not appear to be a valid XLSX document',
      severity: 'error',
      suggestion: 'Please ensure the file is a valid XLSX document',
    });
  }
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.substring(lastDotIndex).toLowerCase() : '';
};

/**
 * Get file type from extension
 */
export const getFileTypeFromExtension = (
  extension: string,
): 'pdf' | 'csv' | 'txt' | 'docx' | 'xlsx' => {
  const extensionMap: Record<string, 'pdf' | 'csv' | 'txt' | 'docx' | 'xlsx'> = {
    '.pdf': 'pdf',
    '.csv': 'csv',
    '.txt': 'txt',
    '.docx': 'docx',
    '.xlsx': 'xlsx',
  };

  return extensionMap[extension] || 'txt';
};

/**
 * Map extension to file type
 */
export const mapExtensionToFileType = (
  extension: string,
): 'pdf' | 'csv' | 'txt' | 'docx' | 'xlsx' => {
  return getFileTypeFromExtension(extension);
};

/**
 * Check if file type is supported for climate documents
 */
export const isSupportedClimateFileType = (fileType: string): boolean => {
  return ['pdf', 'csv', 'txt', 'docx', 'xlsx'].includes(fileType);
};

/**
 * Get maximum file size for file type
 */
export const getMaxSizeForFileType = (
  fileType: string,
  config: ClimateFileValidationConfig,
): number => {
  const sizeMap: Record<string, number> = {
    pdf: config.pdfValidation.maxFileSize,
    csv: config.csvValidation.maxFileSize,
    txt: config.txtValidation.maxFileSize,
    docx: config.docxValidation.maxFileSize,
    xlsx: config.xlsxValidation.maxFileSize,
  };

  return sizeMap[fileType] || 10 * 1024 * 1024; // 10MB default
};

/**
 * Check if file has suspicious characteristics
 */
export const isSuspiciousClimateFile = (file: Express.Multer.File): boolean => {
  const fileName = file.originalname.toLowerCase();

  return hasSuspiciousExtension(fileName) || hasSuspiciousName(fileName);
};

/**
 * Check if file has suspicious extension patterns
 */
const hasSuspiciousExtension = (fileName: string): boolean => {
  const suspiciousPatterns = [
    /\.(exe|bat|cmd|com|scr|pif|vbs|js|jar|php|asp|aspx|jsp)$/i,
    /\.(sh|bash|zsh|fish|ps1|psm1)$/i,
    /\.(py|rb|pl|go|rs|cpp|c|h)$/i,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(fileName));
};

/**
 * Check if file has suspicious name patterns
 */
const hasSuspiciousName = (fileName: string): boolean => {
  const suspiciousNames = [
    'malware',
    'virus',
    'trojan',
    'backdoor',
    'keylogger',
    'rootkit',
    'spyware',
    'adware',
    'ransomware',
  ];

  return suspiciousNames.some(name => fileName.includes(name));
};

/**
 * Format bytes to human readable string
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
