/**
 * Climate Document Validation Middleware
 * Basic file structure validation for climate documents (.pdf, .csv, .txt, .docx, .xlsx)
 * Simple validation before forwarding to Python backend
 */

import type { Request, Response, NextFunction } from 'express';
import type {
  ClimateValidationResult,
  ClimateValidationError,
  ClimateValidationWarning,
  ClimateFileValidationConfig,
} from '../types/climateValidation';
import logger from '../utils/logger';
import {
  extractFilesFromRequest,
  extractBasicMetadata,
  validateFileType,
  validateFileSize,
  checkSuspiciousFile,
} from './climateValidationUtils';
import {
  validatePDFBasicStructure,
  validateCSVBasicStructure,
  validateTXTBasicStructure,
  validateDOCXBasicStructure,
  validateXLSXBasicStructure,
} from './climateValidationValidators';
import { mapExtensionToFileType } from './climateValidationHelpers';

/**
 * Helper function to validate all files
 */
const validateAllFiles = async (
  files: Express.Multer.File[],
  config: ClimateFileValidationConfig,
): Promise<ClimateValidationResult[]> => {
  const validationResults: ClimateValidationResult[] = [];

  for (const file of files) {
    const result = await validateClimateFile(file, config);
    validationResults.push(result);
  }

  return validationResults;
};

/**
 * Helper function to handle validation errors
 */
const handleValidationErrors = (
  res: Response,
  validationResults: ClimateValidationResult[],
  files: Express.Multer.File[],
): void => {
  const allErrors = validationResults.flatMap(result => result.errors);
  const allWarnings = validationResults.flatMap(result => result.warnings);

  logger.warn('Climate document validation failed', {
    errors: allErrors,
    warnings: allWarnings,
    files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
  });

  res.status(400).json({
    success: false,
    message: 'Climate document validation failed',
    errors: allErrors.map(e => e.message),
    warnings: allWarnings.map(w => w.message),
    validationResults,
  });
};

/**
 * Helper function to log validation warnings
 */
const logValidationWarnings = (validationResults: ClimateValidationResult[], files: Express.Multer.File[]): void => {
  const allWarnings = validationResults.flatMap(result => result.warnings);
  logger.info('Climate document validation warnings', {
    warnings: allWarnings,
    files: files.map(f => ({ name: f?.originalname, size: f?.size, type: f?.mimetype })),
  });
};

/**
 * Check if request has files
 */
const checkRequestHasFiles = (req: Request, res: Response): boolean => {
  if (!req.file && !req.files) {
    res.status(400).json({
      success: false,
      message: 'No climate document provided',
      errors: ['Climate risk document is required'],
    });
    return false;
  }
  return true;
};

/**
 * Process validation results
 */
const processValidationResults = (context: {
  validationResults: ClimateValidationResult[];
  files: Express.Multer.File[];
  res: Response;
  req: Request;
  next: NextFunction;
}): void => {
  const { validationResults, files, res } = context;

  if (hasValidationErrors(validationResults)) {
    handleValidationErrors(res, validationResults, files);
    return;
  }

  handleValidationSuccess(context);
};

/**
 * Check if validation has errors
 */
const hasValidationErrors = (validationResults: ClimateValidationResult[]): boolean => {
  return validationResults.some(result => !result.isValid);
};

/**
 * Handle successful validation
 */
const handleValidationSuccess = (context: {
  validationResults: ClimateValidationResult[];
  files: Express.Multer.File[];
  req: Request;
  next: NextFunction;
}): void => {
  const { validationResults, files, req, next } = context;

  if (hasValidationWarnings(validationResults)) {
    logValidationWarnings(validationResults, files);
  }

  // Attach validation results to request for use in controllers
  req.climateValidationResults = validationResults;
  next();
};

/**
 * Check if validation has warnings
 */
const hasValidationWarnings = (validationResults: ClimateValidationResult[]): boolean => {
  return validationResults.some(result => result.warnings.length > 0);
};

/**
 * Climate-specific file validation middleware
 */
export const validateClimateDocument = (config: ClimateFileValidationConfig) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!checkRequestHasFiles(req, res)) {
        return;
      }

      const files = extractFilesFromRequest(req);
      const validationResults = await validateAllFiles(files, config);
      processValidationResults({ validationResults, files, res, req, next });
    } catch (error) {
      logger.error('Climate document validation error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      res.status(500).json({
        success: false,
        message: 'Climate document validation failed due to internal error',
        errors: ['Internal validation error'],
      });
    }
  };
};

/**
 * Validate individual climate document file - Basic structure validation only
 */
const validateClimateFile = (
  file: Express.Multer.File,
  config: ClimateFileValidationConfig,
): ClimateValidationResult => {
  const errors: ClimateValidationError[] = [];
  const warnings: ClimateValidationWarning[] = [];

  // Extract basic metadata
  const metadata = extractBasicMetadata(file);

  // Validate file type and size
  validateFileTypeAndSize(file, config, errors, warnings);

  // Validate basic file structure
  validateBasicFileStructure(file, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    metadata,
  };
};

/**
 * Validate file type and size constraints
 */
const validateFileTypeAndSize = (
  file: Express.Multer.File,
  config: ClimateFileValidationConfig,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  const fileType = validateFileType(file, errors);
  if (fileType) {
    validateFileSize(file, fileType, config, errors);
  }

  checkSuspiciousFile(file, _warnings);
};

/**
 * Validation function type
 */
type ValidationFunction = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  warnings: ClimateValidationWarning[],
) => void;

/**
 * Get validation function for file type
 */
const getValidationFunction = (fileType: string): ValidationFunction | null => {
  const validationMap: Record<string, ValidationFunction> = {
    pdf: validatePDFBasicStructure,
    csv: validateCSVBasicStructure,
    txt: validateTXTBasicStructure,
    docx: validateDOCXBasicStructure,
    xlsx: validateXLSXBasicStructure,
  };

  // eslint-disable-next-line security/detect-object-injection
  const validationFunction = validationMap[fileType];
  return validationFunction || null;
};

/**
 * Validate basic file structure - simplified for middleware
 */
const validateBasicFileStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  const fileType = mapExtensionToFileType(file.originalname.toLowerCase().split('.').pop() ?? '');
  const validationFunction = getValidationFunction(fileType);

  if (validationFunction) {
    validationFunction(file, errors, _warnings);
  }
};
