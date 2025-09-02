import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import healthRoutes from './routes/health';
import config from './config';
import logger from './utils/logger';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'clima-risk-validator-service API',
      version: '1.0.0',
      description: 'clima-risk-validator-service CDF',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// Basic middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Request logger middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  ...(config.env === 'development' ? ['http://localhost:8080', 'http://127.0.0.1:3000'] : []),
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        logger.warn(`CORS blocked origin: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    maxAge: 86400, // 24 hours
  }),
);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health routes
app.use('/api/health', healthRoutes);

// Debug endpoint (development only)
if (config.env === 'development') {
  app.get('/debug/env', (_req: Request, res: Response) => {
    res.json({
      NODE_ENV: config.env,
      PORT: config.port,
      TLS_REJECT_UNAUTHORIZED: config.nodeTlsRejectUnauthorized,
    });
  });
}

// 404 handler
app.use('*', (req: Request, res: Response) => {
  logger.warn(`404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Error handler
app.use((err: Error, req: Request, res: Response) => {
  logger.error(`Global error handler: ${err.message}`);
  logger.error(`Request: ${req.method} ${req.originalUrl}`);

  const isDevelopment = config.env === 'development';

  res.status(500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'Something went wrong',
    ...(isDevelopment && { stack: err.stack }),
  });
});

app.listen(config.port, () => {
  logger.info(`Health Service running on port ${config.port}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`Swagger docs available at: http://localhost:${config.port}/api-docs`);
});
