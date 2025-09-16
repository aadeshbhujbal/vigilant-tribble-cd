import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import type { FileUploadConfig } from '../types/environment';
import type { FileValidationResult, UploadedFile } from '../types/upload';
import logger from '../utils/logger';

/**
 * File validation middleware
 */
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

    // Handle different file upload scenarios
    let files: Express.Multer.File[] = [];

    if (req.files) {
      if (Array.isArray(req.files)) {
        files = req.files;
      } else {
        // Handle multiple files with different field names
        files = Object.values(req.files).flat();
      }
    } else if (req.file) {
      files = [req.file];
    }

    const validationResult = validateFiles(files, config);

    if (!validationResult.isValid) {
      logger.warn('File validation failed', {
        errors: validationResult.errors,
        warnings: validationResult.warnings,
        files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
      });

      res.status(400).json({
        success: false,
        message: 'File validation failed',
        errors: validationResult.errors,
        warnings: validationResult.warnings,
      });
      return;
    }

    if (validationResult.warnings.length > 0) {
      logger.info('File validation warnings', {
        warnings: validationResult.warnings,
        files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
      });
    }

    next();
  };
};

/**
 * Validate uploaded files against configuration
 */
const validateFiles = (files: Express.Multer.File[], config: FileUploadConfig): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if files array is valid
  const validFiles = files.filter((file): file is Express.Multer.File => file !== undefined);

  if (validFiles.length === 0) {
    errors.push('No valid files provided');
    return { isValid: false, errors, warnings };
  }

  // Check number of files
  if (validFiles.length > config.maxFiles) {
    errors.push(`Too many files. Maximum allowed: ${config.maxFiles}, received: ${validFiles.length}`);
  }

  // Validate each file
  validFiles.forEach((file, index) => {
    const fileErrors: string[] = [];
    const fileWarnings: string[] = [];

    // Check file size
    if (file.size > config.maxFileSize) {
      fileErrors.push(`File ${index + 1} (${file.originalname}) exceeds maximum size of ${formatBytes(config.maxFileSize)}`);
    }

    // Check MIME type
    if (!config.allowedMimeTypes.includes(file.mimetype)) {
      fileErrors.push(`File ${index + 1} (${file.originalname}) has unsupported MIME type: ${file.mimetype}`);
    }

    // Check file extension
    const fileExtension = getFileExtension(file.originalname);
    if (!config.allowedExtensions.includes(fileExtension)) {
      fileErrors.push(`File ${index + 1} (${file.originalname}) has unsupported extension: ${fileExtension}`);
    }

    // Check for suspicious file names
    if (isSuspiciousFileName(file.originalname)) {
      fileWarnings.push(`File ${index + 1} (${file.originalname}) has a suspicious name`);
    }

    // Check for empty files
    if (file.size === 0) {
      fileWarnings.push(`File ${index + 1} (${file.originalname}) is empty`);
    }

    errors.push(...fileErrors);
    warnings.push(...fileWarnings);
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Get file extension from filename
 */
const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.substring(lastDotIndex).toLowerCase() : '';
};

/**
 * Check if filename is suspicious
 */
const isSuspiciousFileName = (filename: string): boolean => {
  const suspiciousPatterns = [
    /\.(exe|bat|cmd|com|scr|pif|vbs|js|jar|php|asp|aspx|jsp)$/i,
    /\.(sh|bash|zsh|fish|ps1|psm1)$/i,
    /\.(sql|db|sqlite|sqlite3)$/i,
    /\.(log|tmp|temp|bak|backup)$/i,
    /^\./, // Hidden files
    /[<>:"|?*]/, // Invalid characters
    /\.{2,}/, // Multiple dots
    /^\.+$/, // Only dots
  ];

  return suspiciousPatterns.some(pattern => pattern.test(filename));
};

/**
 * Format bytes to human readable format
 */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Create multer configuration for file uploads
 */
export const createMulterConfig = (config: FileUploadConfig) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: config.maxFileSize,
      files: config.maxFiles,
    },
    fileFilter: (req, file, cb) => {
      // Basic file filter - detailed validation happens in validateFile middleware
      const fileExtension = getFileExtension(file.originalname);

      if (config.allowedMimeTypes.includes(file.mimetype) &&
          config.allowedExtensions.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error(`File type not allowed: ${file.mimetype} (${fileExtension})`));
      }
    },
  });
};

/**
 * Error handler for multer errors
 */
export const handleMulterError = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error';
    let statusCode = 400;

    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      case 'LIMIT_PART_COUNT':
        message = 'Too many parts';
        break;
      case 'LIMIT_FIELD_KEY':
        message = 'Field name too long';
        break;
      case 'LIMIT_FIELD_VALUE':
        message = 'Field value too long';
        break;
      case 'LIMIT_FIELD_COUNT':
        message = 'Too many fields';
        break;
      default:
        message = 'File upload error';
    }

    logger.error('Multer error', { error: error.message, code: error.code });

    res.status(statusCode).json({
      success: false,
      message,
      errors: [error.message],
    });
    return;
  }

  // Pass other errors to the next error handler
  next(error);
};
