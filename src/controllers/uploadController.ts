import type { Request, Response, NextFunction } from 'express';
import type { UploadResponse, PythonServiceResponse, UploadMetadata } from '../types/upload';
import config from '../config';
import logger from '../utils/logger';

/**
 * Upload file to Python service
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const file = req.file;
    const files = req.files;

    if (!file && !files) {
      res.status(400).json({
        success: false,
        message: 'No file provided',
        errors: ['File is required'],
      });
      return;
    }

    // Handle single file or multiple files
    const filesToProcess = files ? (Array.isArray(files) ? files : [files]) : [file];
    const validFiles = filesToProcess.filter((f): f is Express.Multer.File => f !== undefined);

    if (validFiles.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No valid files provided',
        errors: ['Valid file is required'],
      });
      return;
    }

    // Process each file
    const results: UploadResponse[] = [];

    for (const file of validFiles) {
      try {
        const result = await processFile(file);
        results.push(result);
      } catch (error) {
        logger.error('Error processing file', {
          fileName: file.originalname,
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        results.push({
          success: false,
          message: `Failed to process file: ${file.originalname}`,
          fileName: file.originalname,
          fileSize: file.size,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
        });
      }
    }

    // Determine overall response
    const allSuccessful = results.every(result => result.success);
    const statusCode = allSuccessful ? 200 : 207; // 207 Multi-Status for partial success

    // Determine if any files were actually processed (not just uploaded)
    const processedFiles = results.filter(r => r.success && r.processingStatus === 'completed').length;
    const skippedFiles = results.filter(r => r.success && r.processingStatus === 'skipped').length;

    let message = '';
    if (allSuccessful) {
      if (processedFiles > 0 && skippedFiles > 0) {
        message = `All files uploaded successfully (${processedFiles} processed, ${skippedFiles} skipped - Python service not configured)`;
      } else if (processedFiles > 0) {
        message = 'All files uploaded and processed successfully';
      } else {
        message = 'All files uploaded successfully (Python service not configured - processing skipped)';
      }
    } else {
      message = 'Some files failed to upload';
    }

    res.status(statusCode).json({
      success: allSuccessful,
      message,
      results,
      totalFiles: validFiles.length,
      successfulFiles: results.filter(r => r.success).length,
      failedFiles: results.filter(r => !r.success).length,
      processedFiles,
      skippedFiles,
    });

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
      logger.info('Python service not configured, simulating successful processing', {
        fileId,
        fileName: file.originalname,
      });

      // Simulate successful upload when Python service is not configured
      return {
        success: true,
        message: 'File uploaded successfully (Python service not configured - processing skipped)',
        fileId,
        fileName: file.originalname,
        fileSize: file.size,
        processingStatus: 'skipped',
      };
    }

    // Forward file to Python service
    const pythonResponse = await forwardToPythonService(file, fileId);

    const processingTime = Date.now() - startTime;

    // Log successful processing
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

  } catch (error) {
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
  }
};

/**
 * Forward file to Python service
 */
const forwardToPythonService = async (file: Express.Multer.File, fileId: string): Promise<PythonServiceResponse> => {
  const formData = new FormData();

  // Create a Blob from the buffer (Node.js compatible)
  const fileBlob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
  formData.append('file', fileBlob, file.originalname);
  formData.append('fileId', fileId);
  formData.append('metadata', JSON.stringify({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    uploadTimestamp: new Date().toISOString(),
  }));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.fileUpload.uploadTimeout);

  try {
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

    const result: PythonServiceResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Python service processing failed');
    }

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
export const getUploadStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
 * Generate unique file ID
 */
const generateFileId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

// Note: Upload health check is integrated into the main health endpoint at /api/health
