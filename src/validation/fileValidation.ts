import type { Request, Response } from 'express';
import type { FileUploadConfig } from '../types/environment';
import type { FileValidationResult } from '../types/upload';
import logger from '../utils/logger';
import { getFileExtension, formatBytes, isSuspiciousFileName } from '../lib/fileUtils';

export const extractFilesFromRequest = (req: Request): Express.Multer.File[] => {
  let files: Express.Multer.File[] = [];

  if (req.files) {
    if (Array.isArray(req.files)) {
      const { files: reqFiles } = req;
      files = reqFiles;
    } else {
      const fileValues = req.files as Record<string, Express.Multer.File[]>;
      files = Object.values(fileValues).flat();
    }
  } else if (req.file) {
    files = [req.file];
  }

  return files;
};

const validateIndividualFile = (
  file: Express.Multer.File,
  index: number,
  config: FileUploadConfig,
): { errors: string[]; warnings: string[] } => {
  const fileErrors: string[] = [];
  const fileWarnings: string[] = [];

  if (file.size > config.maxFileSize) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) exceeds maximum size of ${formatBytes(config.maxFileSize)}`,
    );
  }

  if (!config.allowedMimeTypes.includes(file.mimetype)) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) has unsupported MIME type: ${file.mimetype}`,
    );
  }

  const fileExtension = getFileExtension(file.originalname);
  if (!config.allowedExtensions.includes(fileExtension)) {
    fileErrors.push(
      `File ${index + 1} (${file.originalname}) has unsupported extension: ${fileExtension}`,
    );
  }

  return { errors: fileErrors, warnings: fileWarnings };
};

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

    if (isSuspiciousFileName(file.originalname)) {
      warnings.push(`File ${index + 1} (${file.originalname}) has a suspicious name`);
    }

    if (file.size === 0) {
      warnings.push(`File ${index + 1} (${file.originalname}) is empty`);
    }
  });
};

export const validateFiles = (
  files: Express.Multer.File[],
  config: FileUploadConfig,
): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const validFiles = files.filter((file): file is Express.Multer.File => file !== undefined);

  if (validFiles.length === 0) {
    errors.push('No valid files provided');
    return { isValid: false, errors, warnings };
  }

  validateFileCount(validFiles, config, errors);
  validateAllFiles(validFiles, config, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

export const handleValidationFailure = (
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

export const logValidationWarnings = (warnings: string[], files: Express.Multer.File[]): void => {
  logger.info('File validation warnings', {
    warnings,
    files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
  });
};
