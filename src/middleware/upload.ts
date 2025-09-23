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
    if (!req.file && !req.files) {
      res.status(400).json({
        success: false,
        message: 'No file provided',
        errors: ['File is required'],
      });
      return;
    }

    const files = extractFilesFromRequest(req);
    const validationResult = validateFiles(files, config);

    if (!validationResult.isValid) {
      handleValidationFailure(res, validationResult, files);
      return;
    }

    if (validationResult.warnings.length > 0) {
      logValidationWarnings(validationResult.warnings, files);
    }

    next();
  };
};
