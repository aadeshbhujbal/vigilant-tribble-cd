/**
 * Environment configuration types and interfaces for middleware service
 */

import type { ClimateFileValidationConfig } from './climateValidation';

export type Environment = 'development' | 'staging' | 'production';

export interface SecurityConfig {
  corsOrigins: string[];
  rateLimitWindowMs: number;
  rateLimitMax: number;
  enableHttps: boolean;
  trustProxy: boolean;
  allowedMethods: string[];
  allowedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  enableConsole: boolean;
  enableFile: boolean;
  logDirectory: string;
  maxFileSize: string;
  maxFiles: number;
  enableRequestLogging: boolean;
  enableErrorLogging: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  servers: Array<{
    url: string;
    description: string;
  }>;
  basePath: string;
}

export interface FileUploadConfig {
  enabled: boolean;
  maxFileSize: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
  maxFiles: number;
  uploadTimeout: number;
  enableValidation: boolean;
  enableMalwareScan: boolean;
  pythonServiceUrl?: string;
}

export interface MiddlewareConfig {
  // Core settings
  environment: Environment;
  port: number;
  host: string;
  nodeTlsRejectUnauthorized: boolean;

  // Feature flags
  enableDebugEndpoints: boolean;
  enableSwagger: boolean;
  enableCors: boolean;
  enableRateLimit: boolean;
  enableHealthCheck: boolean;
  enableFileUpload: boolean;

  // Middleware specific
  security: SecurityConfig;
  logging: LoggingConfig;
  swagger: SwaggerConfig;
  fileUpload: FileUploadConfig;
  climateValidation: ClimateFileValidationConfig;

  // Application specific
  appName: string;
  appVersion: string;
  apiPrefix: string;
  maxRequestSize: string;
  requestTimeout: number;

  // Service integration
  pythonServiceUrl?: string;
  angularAppUrl?: string;
  serviceTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface EnvironmentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
