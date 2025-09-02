import { Router } from 'express';
import { healthCheck, statusCheck } from '../controllers/healthController';

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Basic health check endpoint
 *     description: Returns basic service health status.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 service:
 *                   type: string
 *                   example: Health Service
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
router.get('/', healthCheck);

/**
 * @swagger
 * /api/health/status:
 *   get:
 *     summary: System status check
 *     description: Returns system status and resource usage information.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: System status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 system:
 *                   type: object
 *                   properties:
 *                     uptimeSeconds:
 *                       type: number
 *                     memory:
 *                       type: object
 *                       properties:
 *                         rss:
 *                           type: number
 *                         heapTotal:
 *                           type: number
 *                         heapUsed:
 *                           type: number
 *                         external:
 *                           type: number
 *                     nodeVersion:
 *                       type: string
 *                     platform:
 *                       type: string
 *                     arch:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
router.get('/status', statusCheck);

export default router;
