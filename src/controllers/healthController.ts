import { Request, Response } from "express";
import config from "../config";
import logger from "../utils/logger";

export const healthCheck = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({
    status: "Healthy",
    timestamp: new Date().toISOString(),
    service: "Health Service",
    version: "1.0.0",
  });
};

export const statusCheck = async (
  _req: Request,
  res: Response
): Promise<void> => {
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
    status: "ok",
    system,
  });
};
