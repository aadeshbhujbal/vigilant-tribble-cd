import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import type { FileUploadConfig } from '../types/environment';
import logger from '../utils/logger';
import { getFileExtension } from './fileUtils';
import { MULTER_ERROR_MESSAGES } from '../constants/multerErrors';

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
