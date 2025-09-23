import type { ClimateValidationError, ClimateValidationWarning } from '../types/climateValidation';
import {
  checkPDFHeader,
  checkPDFPasswordProtection,
  checkCSVContent,
  checkTXTContent,
  checkDOCXHeader,
  checkXLSXHeader,
} from './climateValidationHelpers';

/**
 * Validate PDF basic structure
 */
export const validatePDFBasicStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  try {
    const { buffer } = file;

    if (checkPDFHeader(buffer, errors)) {
      checkPDFPasswordProtection(buffer, errors);
    }
  } catch (error) {
    errors.push({
      code: 'PDF_VALIDATION_ERROR',
      message: `Failed to validate PDF structure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      suggestion: 'Please ensure the file is a valid PDF document',
    });
  }
};

/**
 * Validate CSV basic structure
 */
export const validateCSVBasicStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  try {
    const content = file.buffer.toString('utf8');
    checkCSVContent(content, errors, _warnings);
  } catch (error) {
    errors.push({
      code: 'CSV_VALIDATION_ERROR',
      message: `Failed to validate CSV structure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      suggestion: 'Please ensure the file is a valid CSV document',
    });
  }
};

/**
 * Validate TXT basic structure
 */
export const validateTXTBasicStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  try {
    const content = file.buffer.toString('utf8');
    checkTXTContent(content, errors, _warnings);
  } catch (error) {
    errors.push({
      code: 'TXT_VALIDATION_ERROR',
      message: `Failed to validate text file structure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      suggestion: 'Please ensure the file is a valid text document',
    });
  }
};

/**
 * Validate DOCX basic structure
 */
export const validateDOCXBasicStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  try {
    const { buffer } = file;
    checkDOCXHeader(buffer, errors);
  } catch (error) {
    errors.push({
      code: 'DOCX_VALIDATION_ERROR',
      message: `Failed to validate DOCX structure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      suggestion: 'Please ensure the file is a valid DOCX document',
    });
  }
};

/**
 * Validate XLSX basic structure
 */
export const validateXLSXBasicStructure = (
  file: Express.Multer.File,
  errors: ClimateValidationError[],
  _warnings: ClimateValidationWarning[],
): void => {
  try {
    const { buffer } = file;
    checkXLSXHeader(buffer, errors);
  } catch (error) {
    errors.push({
      code: 'XLSX_VALIDATION_ERROR',
      message: `Failed to validate XLSX structure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'error',
      suggestion: 'Please ensure the file is a valid XLSX document',
    });
  }
};
