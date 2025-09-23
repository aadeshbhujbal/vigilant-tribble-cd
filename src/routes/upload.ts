import {
  Router,
  type Router as ExpressRouter,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { uploadFile, getUploadStatus } from '../controllers/uploadController';
import { createMulterConfig, validateFile, handleMulterError } from '../middleware/upload';
import { validateClimateDocument } from '../middleware/climateValidation';
import config from '../config';
import logger from '../utils/logger';

// eslint-disable-next-line new-cap
const router: ExpressRouter = Router();

// Create multer configuration
const upload = createMulterConfig(config.fileUpload);

// File validation middleware
const fileValidation = validateFile(config.fileUpload);

// Climate document validation middleware
const climateValidation = validateClimateDocument(config.climateValidation);

// Single file upload endpoint removed - use /multiple endpoint for all uploads

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload climate risk documents for analysis
 *     description: Upload climate risk documents (.pdf, .csv, .txt, .docx, .xlsx) with basic validation before processing by Python service
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Climate risk documents to upload (.pdf, .csv, .txt, .docx, .xlsx) - can be single or multiple files
 *             required:
 *               - files
 *     responses:
 *       200:
 *         description: All files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All files uploaded successfully (Python service not configured - processing skipped)"
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       success:
 *                         type: boolean
 *                       fileId:
 *                         type: string
 *                       fileName:
 *                         type: string
 *                       fileSize:
 *                         type: number
 *                       processingStatus:
 *                         type: string
 *                         enum: [pending, processing, completed, failed, skipped]
 *                 totalFiles:
 *                   type: number
 *                 successfulFiles:
 *                   type: number
 *                 failedFiles:
 *                   type: number
 *                 processedFiles:
 *                   type: number
 *                 skippedFiles:
 *                   type: number
 *       207:
 *         description: Some files failed to upload (Multi-Status)
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       413:
 *         description: Files too large
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  upload.array('files', config.fileUpload.maxFiles),
  handleMulterError,
  fileValidation,
  climateValidation,
  uploadFile,
);

/**
 * @swagger
 * /api/upload/status/{fileId}:
 *   get:
 *     summary: Get upload status
 *     description: Get the processing status of an uploaded file
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique file identifier
 *     responses:
 *       200:
 *         description: Upload status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 fileId:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [pending, processing, completed, failed, skipped]
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get('/status/:fileId', getUploadStatus);

// Note: Upload health check is integrated into the main health endpoint at /api/health

// Error handling middleware for upload routes
router.use((error: Error, req: Request, res: Response, _next: NextFunction): void => {
  logger.error('Upload route error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    errors: ['An unexpected error occurred during file upload'],
  });
});

export default router;
