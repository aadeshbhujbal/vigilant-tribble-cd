import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import type { FileUploadConfig } from '../types/environment';
import type { FileValidationResult } from '../types/upload';
import logger from '../utils/logger';

/**
 * Helper function to extract files from request
 */
const extractFilesFromRequest = (req: Request): Express.Multer.File[] => {
  let files: Express.Multer.File[] = [];

  if (req.files) {
    if (Array.isArray(req.files)) {
      const { files: reqFiles } = req;
      files = reqFiles;
    } else {
      // Handle multiple files with different field names
      const { files: fileValues } = req;
      files = Object.values(fileValues).flat();
    }
  } else if (req.file) {
    files = [req.file];
  }

  return files;
};

/**
 * Helper function to handle validation failure
 */
const handleValidationFailure = (
  res: Response,
  validationResult: FileValidationResult,
  files: Express.Multer.File[],
): void => {
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
};

/**
 * Helper function to log validation warnings
 */
const logValidationWarnings = (warnings: string[], files: Express.Multer.File[]): void => {
  logger.info('File validation warnings', {
    warnings,
    files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
  });
};

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

/**
 * Helper function to validate individual file
 */
const validateIndividualFile = (
  file: Express.Multer.File,
  index: number,
  config: FileUploadConfig,
): { errors: string[]; warnings: string[] } => {
  const fileErrors: string[] = [];
  const fileWarnings: string[] = [];

  // Check file size
  if (file.size > config.maxFileSize) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) exceeds maximum size of ${formatBytes(config.maxFileSize)}`,
    );
  }

  // Check MIME type
  if (!config.allowedMimeTypes.includes(file.mimetype)) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) has unsupported MIME type: ${file.mimetype}`,
    );
  }

  // Check file extension
  const fileExtension = getFileExtension(file.originalname);
  if (!config.allowedExtensions.includes(fileExtension)) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) has unsupported extension: ${fileExtension}`,
    );
  }

  return { errors: fileErrors, warnings: fileWarnings };
};

/**
 * Helper function to validate file count
 */
const validateFileCount = (
  validFiles: Express.Multer.File[],
  config: FileUploadConfig,
  errors: string[],
): void => {
  if (validFiles.length > config.maxFiles) {
    errors.push(
      `Too many files. Maximum allowed: ${config.maxFiles}, received: ${validFiles.length}`,
    );
  }
};

/**
 * Helper function to validate all files
 */
const validateAllFiles = (
  validFiles: Express.Multer.File[],
  config: FileUploadConfig,
  errors: string[],
  warnings: string[],
): void => {
  validFiles.forEach((file, index) => {
    const fileValidation = validateIndividualFile(file, index, config);
    errors.push(...fileValidation.errors);
    warnings.push(...fileValidation.warnings);

    // Check for suspicious file names
    if (isSuspiciousFileName(file.originalname)) {
      warnings.push(`File ${index + 1} (${file.originalname}) has a suspicious name`);
    }

    // Check for empty files
    if (file.size === 0) {
      warnings.push(`File ${index + 1} (${file.originalname}) is empty`);
    }
  });
};

/**
 * Validate uploaded files against configuration
 */
const validateFiles = (
  files: Express.Multer.File[],
  config: FileUploadConfig,
): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if files array is valid
  const validFiles = files.filter((file): file is Express.Multer.File => file !== undefined);

  if (validFiles.length === 0) {
    errors.push('No valid files provided');
    return { isValid: false, errors, warnings };
  }

  // Check number of files
  validateFileCount(validFiles, config, errors);

  // Validate each file
  validateAllFiles(validFiles, config, errors, warnings);

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
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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

      if (
        config.allowedMimeTypes.includes(file.mimetype) &&
        config.allowedExtensions.includes(fileExtension)
      ) {
        cb(null, true);
      } else {
        cb(new Error(`File type not allowed: ${file.mimetype} (${fileExtension})`));
      }
    },
  });
};

/**
 * Multer error message mapping
 */
const MULTER_ERROR_MESSAGES: Record<string, string> = {
  LIMIT_FILE_SIZE: 'File too large',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_UNEXPECTED_FILE: 'Unexpected file field',
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
};

/**
 * Helper function to get Multer error message
 */
const getMulterErrorMessage = (code: string): string => {
  return MULTER_ERROR_MESSAGES[code] ?? 'File upload error';
};

/**
 * Error handler for multer errors
 */
export const handleMulterError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error';
    const statusCode = 400;

    message = getMulterErrorMessage(error.code);

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
