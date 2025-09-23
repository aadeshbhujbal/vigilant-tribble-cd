import type { Request } from 'express';
import type {
  ClimateValidationError,
  ClimateValidationWarning,
  ClimateFileValidationConfig,
  ClimateDocumentMetadata,
} from '../types/climateValidation';
import {
  getFileExtension,
  mapExtensionToFileType,
  isSupportedClimateFileType,
  getMaxSizeForFileType,
  isSuspiciousClimateFile,
  formatBytes,
} from './climateValidationHelpers';

/**
 * Extract files from request
 */
const extractArrayFiles = (req: Request): Express.Multer.File[] => {
  const { files: reqFiles } = req;
  return Array.isArray(reqFiles) ? reqFiles : [];
};

const extractObjectFiles = (req: Request): Express.Multer.File[] => {
  const { files: fileValues } = req;
  if (!fileValues || typeof fileValues !== 'object') {
    return [];
  }
  return Object.values(fileValues).flat();
};

export const extractFilesFromRequest = (req: Request): Express.Multer.File[] => {
  if (req.files) {
    return Array.isArray(req.files) ? extractArrayFiles(req) : extractObjectFiles(req);
  }

  return req.file ? [req.file] : [];
};

/**
 * Extract basic metadata from file
 */
export const extractBasicMetadata = (file: Express.Multer.File): ClimateDocumentMetadata => {
  const fileExtension = getFileExtension(file.originalname).toLowerCase();
  const fileType = mapExtensionToFileType(fileExtension);

  return {
    fileName: file.originalname,
    fileType,
    fileSize: file.size,
    mimeType: file.mimetype,
    uploadTimestamp: new Date(),
  };
};

/**
 * Validate file type
 */
export const validateFileType = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
): string | null => {
  const fileExtension = getFileExtension(file.originalname).toLowerCase();
  const fileType = mapExtensionToFileType(fileExtension);

  if (!isSupportedClimateFileType(fileType)) {
    errors.push({
      code: 'UNSUPPORTED_FILE_TYPE',
      message: `File type ${fileType} is not supported for climate risk documents`,
      severity: 'error',
      suggestion: 'Please upload a PDF, CSV, TXT, DOCX, or XLSX file',
    });
    return null;
  }

  return fileType;
};

/**
 * Validate file size
 */
export const validateFileSize = (
  file: Express.Multer.File,
  fileType: string,
  config: ClimateFileValidationConfig,
  errors: ClimateValidationError[],
): void => {
  const maxSize = getMaxSizeForFileType(fileType, config);
  if (file.size > maxSize) {
    errors.push({
      code: 'FILE_TOO_LARGE',
      message: `${fileType.toUpperCase()} file exceeds maximum size of ${formatBytes(maxSize)}`,
      severity: 'error',
      suggestion: 'Please compress the file or split it into smaller parts',
    });
  }
};

/**
 * Check for suspicious file characteristics
 */
export const checkSuspiciousFile = (
  file: Express.Multer.File,
  _warnings: ClimateValidationWarning[],
): void => {
  if (isSuspiciousClimateFile(file)) {
    _warnings.push({
      code: 'SUSPICIOUS_FILE',
      message: 'File has characteristics that may indicate it is not a climate risk document',
      severity: 'warning',
      suggestion: 'Please verify this is a legitimate climate risk document',
    });
  }
};
