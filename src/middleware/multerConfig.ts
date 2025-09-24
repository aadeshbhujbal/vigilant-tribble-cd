import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import type { FileUploadConfig } from '../types/environment';
import logger from '../utils/logger';

const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.substring(lastDotIndex).toLowerCase() : '';
};

export const createMulterConfig = (config: FileUploadConfig) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: config.maxFileSize,
      files: config.maxFiles,
    },
    fileFilter: (req, file, cb) => {
      const fileExtension = getFileExtension(file.originalname);

      if (config.allowedMimeTypes.includes(file.mimetype) && config.allowedExtensions.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error(`File type not allowed: ${file.mimetype} (${fileExtension})`));
      }
    },
  });
};

const MULTER_ERROR_MESSAGES: Record<string, string> = {
  LIMIT_FILE_SIZE: 'File too large',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_UNEXPECTED_FILE: 'Unexpected file field',
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
};

const getMulterErrorMessage = (code: string): string => {
  // eslint-disable-next-line security/detect-object-injection
  const errorMessage = MULTER_ERROR_MESSAGES[code];
  return errorMessage || 'File upload error';
};

export const handleMulterError = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof multer.MulterError) {
    const message = getMulterErrorMessage(error.code);
    const statusCode = 400;

    logger.error('Multer error', {
      error: error.message,
      code: error.code,
      field: error.field,
      files: req.files ? 'present' : 'none',
    });

    res.status(statusCode).json({
      success: false,
      message,
      errors: [error.message],
    });
    return;
  }

  next(error);
};
