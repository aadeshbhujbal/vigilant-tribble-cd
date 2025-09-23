import type { Request, Response, NextFunction } from 'express';
import type { FileUploadConfig } from '../types/environment';
import {
  extractFilesFromRequest,
  validateFiles,
  handleValidationFailure,
  logValidationWarnings,
} from '../validation/fileValidation';
import { createMulterConfig, handleMulterError } from '../lib/multerConfig';

export { createMulterConfig, handleMulterError };

export const validateFile = (config: FileUploadConfig) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!hasFilesInRequest(req)) {
      return sendNoFileError(res);
    }

    const files = extractFilesFromRequest(req);
    const validationResult = validateFiles(files, config);

    if (!validationResult.isValid) {
      handleValidationFailure(res, validationResult, files);
      return;
    }

    handleValidationWarnings(validationResult.warnings, files);
    next();
  };
};

/**
 * Check if request has files
 */
const hasFilesInRequest = (req: Request): boolean => {
  return !!(req.file ?? req.files);
};

/**
 * Send no file error response
 */
const sendNoFileError = (res: Response): void => {
  res.status(400).json({
    success: false,
    message: 'No file provided',
    errors: ['File is required'],
  });
};

/**
 * Handle validation warnings
 */
const handleValidationWarnings = (warnings: string[], files: Express.Multer.File[]): void => {
  if (warnings.length > 0) {
    logValidationWarnings(warnings, files);
  }
};
