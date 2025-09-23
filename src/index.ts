import express, { type Request, type Response, type NextFunction } from 'express';
import cors, { type CorsOptions } from 'cors';
import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc, { type OAS3Definition, type OAS3Options } from 'swagger-jsdoc';
import healthRoutes from './routes/health';
import questionRoutes from './routes/questions';
import uploadRoutes from './routes/upload';
import config, { validation } from './config';
import logger from './utils/logger';

// Swagger configuration with proper typing
const swaggerOptions: OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.swagger.title,
      version: config.swagger.version,
      description: config.swagger.description,
    },
    servers: config.swagger.servers,
  } as OAS3Definition,
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// Basic middleware
app.use(express.json({ limit: config.maxRequestSize }));
app.use(express.urlencoded({ limit: config.maxRequestSize, extended: true }));

// Rate limiting
if (config.enableRateLimit) {
  const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMax,
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: `${Math.ceil(config.security.rateLimitWindowMs / 60000)} minutes`,
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(`${config.apiPrefix}/`, limiter);
}

// Request logger middleware
if (config.logging.enableRequestLogging) {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.http(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// Helper function to check development origin
const isDevelopmentOriginAllowed = (origin: string): boolean => {
  if (config.environment !== 'development') return false;

  const serverOrigin = `http://${config.host}:${config.port}`;
  return origin === serverOrigin;
};

// Helper function to handle CORS origin validation
const createCorsOriginHandler = () => {
  return (
    origin: string | undefined,
    callback: (_err: Error | null, _allow?: boolean) => void,
  ): void => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if origin is allowed in development
    if (isDevelopmentOriginAllowed(origin)) {
      return callback(null, true);
    }

    // Check if origin is in allowed list
    if (config.security.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Block origin
    logger.warn(`CORS blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  };
};

// CORS configuration
if (config.enableCors) {
  const corsOptions: CorsOptions = {
    origin: createCorsOriginHandler(),
    credentials: config.security.credentials,
    methods: config.security.allowedMethods,
    allowedHeaders: config.security.allowedHeaders,
    maxAge: config.security.maxAge,
  };

  app.use(cors(corsOptions));
}

// Swagger documentation
if (config.enableSwagger) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Health routes
if (config.enableHealthCheck) {
  app.use(`${config.apiPrefix}/health`, healthRoutes);
}

// Question routes
app.use(`${config.apiPrefix}/questions`, questionRoutes);

// Upload routes
if (config.enableFileUpload) {
  app.use(`${config.apiPrefix}/upload`, uploadRoutes);
}

// Debug endpoint (development only)
if (config.enableDebugEndpoints) {
  app.get('/debug/env', (_req: Request, res: Response): void => {
    const debugInfo = {
      environment: config.environment,
      port: config.port,
      host: config.host,
      nodeTlsRejectUnauthorized: config.nodeTlsRejectUnauthorized,
      validation,
      config: {
        enableDebugEndpoints: config.enableDebugEndpoints,
        enableSwagger: config.enableSwagger,
        enableCors: config.enableCors,
        enableRateLimit: config.enableRateLimit,
        enableHealthCheck: config.enableHealthCheck,
        enableFileUpload: config.enableFileUpload,
      },
    };
    res.json(debugInfo);
  });
}

// 404 handler
app.use('*', (req: Request, res: Response): void => {
  logger.warn(`404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction): void => {
  if (config.logging.enableErrorLogging) {
    logger.error(`Global error handler: ${err.message}`);
    logger.error(`Request: ${req.method} ${req.originalUrl}`);
  }

  const isDevelopment = config.environment === 'development';

  res.status(500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'Something went wrong',
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Helper function to log startup information
const logStartupInfo = (isDevelopment: boolean): void => {
  if (isDevelopment) {
    logger.info('🚀 Application started successfully!');
    logger.info(`📡 App started on port: ${config.port}`);
    logger.info(`🌐 Server running on: ${config.host}:${config.port}`);
    logger.info(`🏷️  Environment: ${config.environment}`);
    logger.info(`📦 Version: ${config.appVersion}`);
  } else {
    logger.info(`${config.appName} started successfully`);
    logger.info(`App started on port: ${config.port}`);
    logger.info(`Server running on: ${config.host}:${config.port}`);
    logger.info(`Environment: ${config.environment}`);
    logger.info(`Version: ${config.appVersion}`);
  }
};

// Helper function to log swagger endpoint
const logSwaggerEndpoint = (isDevelopment: boolean, protocol: string): void => {
  if (config.enableSwagger) {
    const swaggerUrl = `${protocol}://${config.host}:${config.port}/api-docs`;
    const message = isDevelopment
      ? `📚 Swagger docs available at: ${swaggerUrl}`
      : `Swagger docs available at: ${swaggerUrl}`;
    logger.info(message);
  }
};

// Helper function to log debug endpoint
const logDebugEndpoint = (isDevelopment: boolean, protocol: string): void => {
  if (config.enableDebugEndpoints) {
    const debugUrl = `${protocol}://${config.host}:${config.port}/debug/env`;
    const message = isDevelopment
      ? `🐛 Debug endpoint available at: ${debugUrl}`
      : `Debug endpoint available at: ${debugUrl}`;
    logger.info(message);
  }
};

// Helper function to log file upload endpoint
const logFileUploadEndpoint = (isDevelopment: boolean, protocol: string): void => {
  if (config.enableFileUpload) {
    const uploadUrl = `${protocol}://${config.host}:${config.port}${config.apiPrefix}/upload`;
    if (isDevelopment) {
      logger.info(
        `📁 File upload endpoint available at: ${uploadUrl} (supports single or multiple files)`,
      );
      logger.info(`📊 Max file size: ${Math.round(config.fileUpload.maxFileSize / 1024 / 1024)}MB`);
      logger.info(`📋 Allowed file types: ${config.fileUpload.allowedMimeTypes.join(', ')}`);
    } else {
      logger.info(`File upload endpoint available at: ${uploadUrl}`);
    }
  }
};

// Helper function to log feature endpoints
const logFeatureEndpoints = (isDevelopment: boolean): void => {
  const protocol: string = config.security.enableHttps ? 'https' : 'http';

  logSwaggerEndpoint(isDevelopment, protocol);
  logDebugEndpoint(isDevelopment, protocol);
  logFileUploadEndpoint(isDevelopment, protocol);
};

// Helper function to log validation warnings
const logValidationWarnings = (): void => {
  if (validation.warnings.length > 0) {
    logger.warn('Environment validation warnings:');
    validation.warnings.forEach((warning: string) => {
      logger.warn(`  ⚠️  ${warning}`);
    });
  }
};

app.listen(config.port, config.host, (): void => {
  const isDevelopment = config.environment === 'development';

  logStartupInfo(isDevelopment);
  logFeatureEndpoints(isDevelopment);
  logValidationWarnings();
});
