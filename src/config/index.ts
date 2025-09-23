import path from 'path';
import dotenv from 'dotenv';
import type { MiddlewareConfig, Environment, EnvironmentValidation } from '../types/environment';
import type { ClimateFileValidationConfig } from '../types/climateValidation';

// Dynamically load the appropriate .env file based on NODE_ENV
const env = (process.env.NODE_ENV ?? 'development') as Environment;
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

// Helper function to parse comma-separated strings
const parseCommaSeparated = (value: string | undefined, defaultValue: string[] = []): string[] => {
  if (!value) return defaultValue;
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};

// Helper function to parse boolean values
const parseBoolean = (value: string | undefined, defaultValue = false): boolean => {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Helper function to parse number values
const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Helper function to validate required environment variables
const validateRequiredVars = (errors: string[]): void => {
  const requiredVars = ['NODE_ENV', 'PORT'];
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      errors.push(`Required environment variable ${varName} is not set`);
    }
  });
};

// Helper function to validate NODE_ENV
const validateNodeEnv = (errors: string[]): void => {
  const validEnvs: Environment[] = ['development', 'staging', 'production'];
  if (process.env.NODE_ENV && !validEnvs.includes(process.env.NODE_ENV as Environment)) {
    errors.push(
      `Invalid NODE_ENV: ${process.env.NODE_ENV}. Must be one of: ${validEnvs.join(', ')}`,
    );
  }
};

// Helper function to validate PORT
const validatePort = (errors: string[]): void => {
  const port = parseNumber(process.env.PORT, 3000);
  if (port < 1 || port > 65535) {
    errors.push(`Invalid PORT: ${port}. Must be between 1 and 65535`);
  }
};

// Helper function to validate production-specific settings
const validateProductionSettings = (warnings: string[]): void => {
  if (process.env.ENABLE_DEBUG_ENDPOINTS === 'true') {
    warnings.push('Debug endpoints are enabled in production environment');
  }
  if (process.env.ENABLE_SWAGGER === 'true') {
    warnings.push('Swagger documentation is enabled in production environment');
  }
  if (!process.env.CORS_ORIGINS || process.env.CORS_ORIGINS.includes('localhost')) {
    warnings.push('CORS origins include localhost in production environment');
  }
};

// Environment validation
const validateEnvironment = (): EnvironmentValidation => {
  const errors: string[] = [];
  const warnings: string[] = [];

  validateRequiredVars(errors);
  validateNodeEnv(errors);
  validatePort(errors);

  if (env === 'production') {
    validateProductionSettings(warnings);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

// Build configuration object
const config: MiddlewareConfig = {
  // Core settings
  environment: env,
  port: parseNumber(process.env.PORT, 3000),
  host: process.env.HOST ?? 'localhost',
  nodeTlsRejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0',

  // Feature flags
  enableDebugEndpoints: parseBoolean(process.env.ENABLE_DEBUG_ENDPOINTS, env === 'development'),
  enableSwagger: parseBoolean(process.env.ENABLE_SWAGGER, env === 'development'),
  enableCors: parseBoolean(process.env.ENABLE_CORS, true),
  enableRateLimit: parseBoolean(process.env.ENABLE_RATE_LIMIT, true),
  enableHealthCheck: parseBoolean(process.env.ENABLE_HEALTH_CHECK, true),
  enableFileUpload: parseBoolean(process.env.ENABLE_FILE_UPLOAD, true),

  // Security configuration
  security: {
    corsOrigins: parseCommaSeparated(process.env.CORS_ORIGINS, ['http://localhost:3000']),
    rateLimitWindowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 900000), // 15 minutes
    rateLimitMax: parseNumber(process.env.RATE_LIMIT_MAX, 100),
    enableHttps: parseBoolean(process.env.ENABLE_HTTPS, env === 'production'),
    trustProxy: parseBoolean(process.env.TRUST_PROXY, env === 'production'),
    allowedMethods: parseCommaSeparated(process.env.ALLOWED_METHODS, ['GET', 'POST', 'OPTIONS']),
    allowedHeaders: parseCommaSeparated(process.env.ALLOWED_HEADERS, [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ]),
    credentials: parseBoolean(process.env.CREDENTIALS, true),
    maxAge: parseNumber(process.env.MAX_AGE, 86400), // 24 hours
  },

  // Logging configuration
  logging: {
    level:
      (process.env.LOG_LEVEL as 'error' | 'warn' | 'info' | 'debug') ||
      (env === 'development' ? 'debug' : 'info'),
    enableConsole: parseBoolean(process.env.LOG_ENABLE_CONSOLE, env === 'development'),
    enableFile: parseBoolean(process.env.LOG_ENABLE_FILE, true),
    logDirectory: process.env.LOG_DIRECTORY ?? './logs',
    maxFileSize: process.env.LOG_MAX_FILE_SIZE ?? '10m',
    maxFiles: parseNumber(process.env.LOG_MAX_FILES, 5),
    enableRequestLogging: parseBoolean(
      process.env.LOG_ENABLE_REQUEST_LOGGING,
      env === 'development',
    ),
    enableErrorLogging: parseBoolean(process.env.LOG_ENABLE_ERROR_LOGGING, true),
  },

  // Swagger configuration
  swagger: {
    enabled: parseBoolean(process.env.ENABLE_SWAGGER, env === 'development'),
    title: process.env.APP_NAME ?? 'clima-risk-validator-service',
    description: 'clima-risk-validator-service CDF',
    version: process.env.APP_VERSION ?? '1.0.0',
    servers: [
      {
        url: `http${parseBoolean(process.env.ENABLE_HTTPS, env === 'production') ? 's' : ''}://${process.env.HOST ?? 'localhost'}:${parseNumber(process.env.PORT, 3000)}`,
        description: `${env} server`,
      },
    ],
    basePath: process.env.API_PREFIX ?? '/api',
  },

  // File upload configuration
  fileUpload: {
    enabled: parseBoolean(process.env.ENABLE_FILE_UPLOAD, true),
    maxFileSize: parseNumber(process.env.FILE_UPLOAD_MAX_SIZE, 50 * 1024 * 1024), // 50MB
    allowedMimeTypes: parseCommaSeparated(process.env.FILE_UPLOAD_ALLOWED_TYPES, [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/csv',
      'application/json',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/tiff',
    ]),
    allowedExtensions: parseCommaSeparated(process.env.FILE_UPLOAD_ALLOWED_EXTENSIONS, [
      '.pdf',
      '.xls',
      '.xlsx',
      '.docx',
      '.csv',
      '.json',
      '.txt',
      '.jpg',
      '.jpeg',
      '.png',
      '.tiff',
    ]),
    maxFiles: parseNumber(process.env.FILE_UPLOAD_MAX_FILES, 5),
    uploadTimeout: parseNumber(process.env.FILE_UPLOAD_TIMEOUT, 300000), // 5 minutes
    enableValidation: parseBoolean(process.env.FILE_UPLOAD_ENABLE_VALIDATION, true),
    enableMalwareScan: parseBoolean(process.env.FILE_UPLOAD_ENABLE_MALWARE_SCAN, false),
    pythonServiceUrl: process.env.PYTHON_SERVICE_URL,
  },

  // Climate document validation configuration - simplified for middleware
  climateValidation: {
    // Basic file validation
    pdfValidation: {
      enabled: parseBoolean(process.env.CLIMATE_PDF_VALIDATION_ENABLED, true),
      maxFileSize: parseNumber(process.env.CLIMATE_PDF_MAX_SIZE, 100 * 1024 * 1024), // 100MB
    },
    csvValidation: {
      enabled: parseBoolean(process.env.CLIMATE_CSV_VALIDATION_ENABLED, true),
      maxFileSize: parseNumber(process.env.CLIMATE_CSV_MAX_SIZE, 50 * 1024 * 1024), // 50MB
    },
    txtValidation: {
      enabled: parseBoolean(process.env.CLIMATE_TXT_VALIDATION_ENABLED, true),
      maxFileSize: parseNumber(process.env.CLIMATE_TXT_MAX_SIZE, 10 * 1024 * 1024), // 10MB
    },
    docxValidation: {
      enabled: parseBoolean(process.env.CLIMATE_DOCX_VALIDATION_ENABLED, true),
      maxFileSize: parseNumber(process.env.CLIMATE_DOCX_MAX_SIZE, 50 * 1024 * 1024), // 50MB
    },
    xlsxValidation: {
      enabled: parseBoolean(process.env.CLIMATE_XLSX_VALIDATION_ENABLED, true),
      maxFileSize: parseNumber(process.env.CLIMATE_XLSX_MAX_SIZE, 50 * 1024 * 1024), // 50MB
    },
  } as ClimateFileValidationConfig,

  // Application specific
  appName: process.env.APP_NAME ?? 'clima-risk-validator-service',
  appVersion: process.env.APP_VERSION ?? '1.0.0',
  apiPrefix: process.env.API_PREFIX ?? '/api',
  maxRequestSize: process.env.MAX_REQUEST_SIZE ?? '1mb',
  requestTimeout: parseNumber(process.env.REQUEST_TIMEOUT, 30000),

  // Service integration
  pythonServiceUrl: process.env.PYTHON_SERVICE_URL,
  angularAppUrl: process.env.ANGULAR_APP_URL,
  serviceTimeout: parseNumber(process.env.SERVICE_TIMEOUT, 30000),
  retryAttempts: parseNumber(process.env.RETRY_ATTEMPTS, 3),
  retryDelay: parseNumber(process.env.RETRY_DELAY, 1000),
};

// Validate environment on startup
const validation = validateEnvironment();
if (!validation.isValid) {
  console.error('Environment validation failed:');
  validation.errors.forEach(error => console.error(`  ❌ ${error}`));
  process.exit(1);
}

if (validation.warnings.length > 0) {
  console.warn('Environment validation warnings:');
  validation.warnings.forEach(warning => console.warn(`  ⚠️  ${warning}`));
}

export default config;
export { validation };
