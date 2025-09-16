import type { Request, Response } from 'express';
import logger from '../utils/logger';
import config from '../config';

export const healthCheck = (_req: Request, res: Response): void => {
  const healthStatus = {
    status: 'Healthy',
    timestamp: new Date().toISOString(),
    service: 'Health Service',
    version: config.appVersion,
    features: {
      fileUpload: {
        enabled: config.enableFileUpload,
        maxFileSize: config.fileUpload.maxFileSize,
        maxFiles: config.fileUpload.maxFiles,
        allowedTypes: config.fileUpload.allowedMimeTypes.length,
        pythonServiceConfigured: !!config.fileUpload.pythonServiceUrl,
      },
      swagger: {
        enabled: config.enableSwagger,
      },
      cors: {
        enabled: config.enableCors,
      },
      rateLimit: {
        enabled: config.enableRateLimit,
      },
    },
  };

  res.json(healthStatus);
};

export const statusCheck = (_req: Request, res: Response): void => {
  // System parameters only
  const memoryUsage = process.memoryUsage();
  const system = {
    uptimeSeconds: process.uptime(),
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
    },
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    timestamp: new Date().toISOString(),
  };

  logger.info(`Health check completed - System status: ok`);

  res.json({
    status: 'ok',
    system,
  });
};
