import type { Request, Response } from 'express';
import type { UploadResponse, PythonServiceResponse } from '../types/upload';
import config from '../config';
import logger from '../utils/logger';

/**
 * Helper function to send no file error
 */
export const sendNoFileError = (res: Response): null => {
  res.status(400).json({
    success: false,
    message: 'No file provided',
    errors: ['File is required'],
  });
  return null;
};

/**
 * Helper function to send no valid file error
 */
export const sendNoValidFileError = (res: Response): null => {
  res.status(400).json({
    success: false,
    message: 'No valid files provided',
    errors: ['Valid file is required'],
  });
  return null;
};

/**
 * Helper function to process files array
 */
export const processFilesArray = (files: Express.Multer.File | Express.Multer.File[]): Express.Multer.File[] => {
  const filesToProcess = Array.isArray(files) ? files : [files];
  return filesToProcess.filter((f): f is Express.Multer.File => f !== undefined);
};

/**
 * Helper function to get files to process
 */
const getFilesToProcess = (
  files: Express.Multer.File | Express.Multer.File[] | Record<string, Express.Multer.File[]> | undefined,
  file: Express.Multer.File | undefined,
): Express.Multer.File[] => {
  if (!files) {
    return getSingleFileAsArray(file);
  }

  return extractFilesFromFilesParameter(files);
};

/**
 * Get single file as array or empty array
 */
const getSingleFileAsArray = (file: Express.Multer.File | undefined): Express.Multer.File[] => {
  return file ? [file] : [];
};

/**
 * Extract files from files parameter (array or object)
 */
const extractFilesFromFilesParameter = (
  files: Express.Multer.File | Express.Multer.File[] | Record<string, Express.Multer.File[]>,
): Express.Multer.File[] => {
  if (Array.isArray(files)) {
    return files;
  }

  return Object.values(files as Record<string, Express.Multer.File[]>).flat();
};

/**
 * Helper function to validate file input
 */
export const validateFileInput = (req: Request, res: Response): Express.Multer.File[] | null => {
  const { file } = req;
  const { files } = req;

  if (!file && !files) {
    return sendNoFileError(res);
  }

  const filesToProcess = getFilesToProcess(files, file);
  const validFiles = filesToProcess.filter((f): f is Express.Multer.File => f !== undefined);

  if (validFiles.length === 0) {
    return sendNoValidFileError(res);
  }

  return validFiles;
};

/**
 * Helper function to get file counts
 */
export const getFileCounts = (results: UploadResponse[]) => {
  const processedFiles = results.filter(r => r.success && r.processingStatus === 'completed').length;
  const skippedFiles = results.filter(r => r.success && r.processingStatus === 'skipped').length;
  return { processedFiles, skippedFiles };
};

/**
 * Helper function to build success message
 */
export const buildSuccessMessage = (processedFiles: number, skippedFiles: number): string => {
  if (hasBothProcessedAndSkipped(processedFiles, skippedFiles)) {
    return buildMixedProcessingMessage(processedFiles, skippedFiles);
  }

  if (processedFiles > 0) {
    return 'All files uploaded and processed successfully';
  }

  return 'All files uploaded successfully (Python service not configured - processing skipped)';
};

/**
 * Check if both processed and skipped files exist
 */
const hasBothProcessedAndSkipped = (processedFiles: number, skippedFiles: number): boolean => {
  return processedFiles > 0 && skippedFiles > 0;
};

/**
 * Build message for mixed processing results
 */
const buildMixedProcessingMessage = (processedFiles: number, skippedFiles: number): string => {
  return `All files uploaded successfully (${processedFiles} processed, ${skippedFiles} skipped - Python service not configured)`;
};

/**
 * Helper function to build upload response data
 */
export const buildUploadResponse = (results: UploadResponse[]) => {
  const allSuccessful = results.every(result => result.success);
  const statusCode = allSuccessful ? 200 : 207; // 207 Multi-Status for partial success
  const { processedFiles, skippedFiles } = getFileCounts(results);

  const message = allSuccessful ? buildSuccessMessage(processedFiles, skippedFiles) : 'Some files failed to upload';

  return { allSuccessful, statusCode, message, processedFiles, skippedFiles };
};

/**
 * Helper function to send upload response
 */
export const sendUploadResponse = (
  res: Response,
  responseData: {
    statusCode: number;
    allSuccessful: boolean;
    message: string;
    processedFiles: number;
    skippedFiles: number;
  },
  results: UploadResponse[],
  totalFiles: number,
): void => {
  res.status(responseData.statusCode).json({
    success: responseData.allSuccessful,
    message: responseData.message,
    results,
    totalFiles,
    successfulFiles: results.filter(r => r.success).length,
    failedFiles: results.filter(r => !r.success).length,
    processedFiles: responseData.processedFiles,
    skippedFiles: responseData.skippedFiles,
  });
};

/**
 * Helper function to handle when Python service is not configured
 */
export const handlePythonServiceNotConfigured = (file: Express.Multer.File, fileId: string): UploadResponse => {
  logger.info('Python service not configured, simulating successful processing', {
    fileId,
    fileName: file.originalname,
  });

  return {
    success: true,
    message: 'File uploaded successfully (Python service not configured - processing skipped)',
    fileId,
    fileName: file.originalname,
    fileSize: file.size,
    processingStatus: 'skipped',
  };
};

/**
 * Helper function to handle successful processing
 */
export const handleSuccessfulProcessing = (
  file: Express.Multer.File,
  fileId: string,
  startTime: number,
  pythonResponse: { message: string },
): UploadResponse => {
  const processingTime = Date.now() - startTime;

  logger.info('File processed successfully', {
    fileId,
    fileName: file.originalname,
    processingTime,
    pythonResponse: pythonResponse.message,
  });

  return {
    success: true,
    message: 'File uploaded and processed successfully',
    fileId,
    fileName: file.originalname,
    fileSize: file.size,
    processingStatus: 'completed',
  };
};

/**
 * Helper function to handle processing errors
 */
export const handleProcessingError = (
  file: Express.Multer.File,
  fileId: string,
  startTime: number,
  error: unknown,
): UploadResponse => {
  const processingTime = Date.now() - startTime;

  logger.error('File processing failed', {
    fileId,
    fileName: file.originalname,
    processingTime,
    error: error instanceof Error ? error.message : 'Unknown error',
  });

  return {
    success: false,
    message: `Failed to process file: ${file.originalname}`,
    fileId,
    fileName: file.originalname,
    fileSize: file.size,
    processingStatus: 'failed',
    errors: [error instanceof Error ? error.message : 'Unknown error'],
  };
};

/**
 * Helper function to create form data and controller
 */
export const createFormDataAndController = (file: Express.Multer.File, fileId: string) => {
  const formData = new FormData();

  // Create a Blob from the buffer (Node.js compatible)
  const fileBlob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
  formData.append('file', fileBlob, file.originalname);
  formData.append('fileId', fileId);
  formData.append(
    'metadata',
    JSON.stringify({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      uploadTimestamp: new Date().toISOString(),
    }),
  );

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.fileUpload.uploadTimeout);

  return { formData, controller, timeoutId };
};

/**
 * Helper function to make Python service request
 */
export const makePythonServiceRequest = async (
  formData: FormData,
  controller: AbortController,
  timeoutId: ReturnType<typeof setTimeout>,
): Promise<PythonServiceResponse> => {
  const response = await fetch(`${config.fileUpload.pythonServiceUrl}/process-file`, {
    method: 'POST',
    body: formData,
    signal: controller.signal,
    headers: {
      'User-Agent': `${config.appName}/${config.appVersion}`,
    },
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Python service responded with status: ${response.status} ${response.statusText}`);
  }

  const result = (await response.json()) as PythonServiceResponse;

  if (!result.success) {
    throw new Error(result.message || 'Python service processing failed');
  }

  return result;
};
