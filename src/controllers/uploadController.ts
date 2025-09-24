import type { Request, Response, NextFunction } from 'express';
import type { UploadResponse, PythonServiceResponse } from '../types/upload';
import config from '../config';
import logger from '../utils/logger';
import { randomBytes } from 'crypto';
import {
  validateFileInput,
  buildUploadResponse,
  sendUploadResponse,
  handlePythonServiceNotConfigured,
  handleSuccessfulProcessing,
  handleProcessingError,
  createFormDataAndController,
  makePythonServiceRequest,
} from '../services/uploadService';

/**
 * Upload file to Python service
 */

/**
 * Helper function to process multiple files
 */
const processFiles = async (validFiles: Express.Multer.File[]): Promise<UploadResponse[]> => {
  const results: UploadResponse[] = [];

  for (const file of validFiles) {
    const result = await processFileWithErrorHandling(file);
    results.push(result);
  }

  return results;
};

/**
 * Process individual file with error handling
 */
const processFileWithErrorHandling = async (file: Express.Multer.File): Promise<UploadResponse> => {
  try {
    return await processFile(file);
  } catch (error) {
    return handleFileProcessingError(file, error);
  }
};

/**
 * Handle file processing error
 */
const handleFileProcessingError = (file: Express.Multer.File, error: unknown): UploadResponse => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  logger.error('Error processing file', {
    fileName: file.originalname,
    error: errorMessage,
  });

  return {
    success: false,
    message: `Failed to process file: ${file.originalname}`,
    fileName: file.originalname,
    fileSize: file.size,
    errors: [errorMessage],
  };
};

export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validFiles = validateFileInput(req, res);
    if (!validFiles) return;

    const results = await processFiles(validFiles);

    const responseData = buildUploadResponse(results);

    sendUploadResponse(res, responseData, results, validFiles.length);
  } catch (error) {
    logger.error('Upload controller error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    next(error);
  }
};

/**
 * Process individual file
 */
const processFile = async (file: Express.Multer.File): Promise<UploadResponse> => {
  const fileId = generateFileId();
  const startTime = Date.now();

  try {
    // Log file upload start
    logger.info('Processing file upload', {
      fileId,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
    });

    // Check if Python service is configured
    if (!config.fileUpload.pythonServiceUrl) {
      return handlePythonServiceNotConfigured(file, fileId);
    }

    // Forward file to Python service
    const pythonResponse = await forwardToPythonService(file, fileId);

    return handleSuccessfulProcessing(file, fileId, startTime, pythonResponse);
  } catch (error) {
    return handleProcessingError(file, fileId, startTime, error);
  }
};

/**
 * Forward file to Python service
 */
const forwardToPythonService = async (file: Express.Multer.File, fileId: string): Promise<PythonServiceResponse> => {
  const { formData, controller, timeoutId } = createFormDataAndController(file, fileId);

  try {
    const result = await makePythonServiceRequest(formData, controller, timeoutId);

    return result;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('File processing timeout');
    }

    throw error;
  }
};

/**
 * Get upload status
 */
export const getUploadStatus = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      res.status(400).json({
        success: false,
        message: 'File ID is required',
        errors: ['fileId parameter is required'],
      });
      return;
    }

    // For now, we'll return a simple status
    // In a real implementation, you might query a database or cache
    res.json({
      success: true,
      fileId,
      status: 'completed', // This would come from your storage/database
      message: 'File processing completed',
    });
  } catch (error) {
    logger.error('Get upload status error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    next(error);
  }
};

/**
 * Generate unique file ID using cryptographically secure random bytes
 */
const generateFileId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(8).toString('hex');
  return `${timestamp}-${random}`;
};

// Note: Upload health check is integrated into the main health endpoint at /api/health
