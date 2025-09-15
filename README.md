# Climate Risk Validator Service

A Node.js middleware service for climate risk validation and question management, designed to work with Python backend services and Angular frontend applications.

## 🚀 Features

- **Environment-specific configuration** for development, staging, and production
- **Comprehensive logging** with Winston logger
- **API documentation** with Swagger/OpenAPI
- **Health check endpoints** for monitoring
- **Rate limiting** and security features
- **CORS configuration** for cross-origin requests
- **TypeScript** with strict type checking
- **Environment validation** on startup

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TypeScript

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clima-risk-validator-service
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment configuration (see [Environment Setup](#environment-setup) section)

## 🌍 Environment Setup

This project uses environment-specific configuration files for different deployment stages.

### Environment Files

**Template File (Committed to Git):**
- `.env.template` - Template file with all configuration options and default values

**Environment-Specific Files (Ignored by Git):**
- `.env.development` - Development environment configuration
- `.env.staging` - Staging environment configuration
- `.env.production` - Production environment configuration
- `.env` - Local development override (if needed)

### Setup Instructions

#### For New Developers
1. Copy the template file to create your environment file:
   ```bash
   cp .env.template .env.development
   ```

2. Update the values in `.env.development` according to your local setup

#### For Deployment
1. Copy the appropriate environment file for your deployment:
   ```bash
   # For staging
   cp .env.template .env.staging

   # For production
   cp .env.template .env.production
   ```

2. Update the values according to your deployment environment

### Environment-Specific Configurations

#### Development
- Debug endpoints: **enabled** (with emoji startup messages)
- Swagger documentation: **enabled**
- Logging level: **debug**
- Console logging: **enabled**
- HTTPS: **disabled**
- CORS: **localhost origins**

#### Staging
- Debug endpoints: **disabled** (clean startup messages)
- Swagger documentation: **enabled**
- Logging level: **info**
- Console logging: **enabled**
- HTTPS: **disabled** (can be enabled)
- CORS: **staging domains**

#### Production
- Debug endpoints: **disabled** (clean startup messages)
- Swagger documentation: **disabled**
- Logging level: **warn**
- Console logging: **disabled**
- HTTPS: **enabled**
- CORS: **production domains**

## 🚀 Usage

### Development
```bash
# Start development server with hot reload
npm run dev

# Start with specific environment
npm run dev:staging
npm run dev:production
```

### Production
```bash
# Build the application
npm run build

# Start production server
npm run start

# Start with specific environment
npm run start:dev
npm run start:staging
npm run start:production
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Check linting (strict)
npm run lint:check

# Format code
npm run format

# Check formatting
npm run format:check

# TypeScript type checking
npm run type-check
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Basic health check
- `GET /api/health/status` - Detailed system status

### Questions
- `GET /api/questions` - Get all questions with answers
- `GET /api/questions/:id` - Get specific question by ID
- `POST /api/questions` - Submit a new question

### Documentation
- `GET /api-docs` - Swagger API documentation (development/staging only)

### Debug (Development Only)
- `GET /debug/env` - Environment configuration debug info

## 🔧 Configuration

The application supports comprehensive configuration through environment variables:

### Core Settings
- `NODE_ENV` - Environment (development, staging, production)
- `PORT` - Server port
- `HOST` - Server host
- `NODE_TLS_REJECT_UNAUTHORIZED` - TLS certificate validation

### Security Configuration
- `ENABLE_HTTPS` - Enable HTTPS
- `TRUST_PROXY` - Trust proxy headers
- `CORS_ORIGINS` - Allowed CORS origins
- `ALLOWED_METHODS` - Allowed HTTP methods
- `ALLOWED_HEADERS` - Allowed headers
- `CREDENTIALS` - Allow credentials in CORS
- `MAX_AGE` - CORS preflight cache duration

### Logging Configuration
- `LOG_LEVEL` - Log level (error, warn, info, debug)
- `LOG_ENABLE_CONSOLE` - Enable console logging
- `LOG_ENABLE_FILE` - Enable file logging
- `LOG_DIRECTORY` - Log file directory
- `LOG_MAX_FILE_SIZE` - Maximum log file size
- `LOG_MAX_FILES` - Maximum number of log files
- `LOG_ENABLE_REQUEST_LOGGING` - Enable request logging
- `LOG_ENABLE_ERROR_LOGGING` - Enable error logging

### Feature Flags
- `ENABLE_DEBUG_ENDPOINTS` - Enable debug endpoints
- `ENABLE_SWAGGER` - Enable Swagger documentation
- `ENABLE_CORS` - Enable CORS middleware
- `ENABLE_RATE_LIMIT` - Enable rate limiting
- `ENABLE_HEALTH_CHECK` - Enable health check endpoints

### Application Configuration
- `APP_NAME` - Application name
- `APP_VERSION` - Application version
- `API_PREFIX` - API route prefix
- `MAX_REQUEST_SIZE` - Maximum request body size
- `REQUEST_TIMEOUT` - Request timeout

### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds
- `RATE_LIMIT_MAX` - Maximum requests per window

### Service Integration
- `PYTHON_SERVICE_URL` - Python service URL
- `ANGULAR_APP_URL` - Angular application URL
- `SERVICE_TIMEOUT` - Service request timeout
- `RETRY_ATTEMPTS` - Number of retry attempts
- `RETRY_DELAY` - Delay between retry attempts

## 🏗️ Project Structure

```
src/
├── config/           # Configuration management
├── controllers/      # Request handlers
├── data/            # Demo data and data management
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (logging, etc.)
└── index.ts         # Application entry point
```

## 🔒 Security Features

- **Rate limiting** to prevent abuse
- **CORS configuration** for secure cross-origin requests
- **Environment validation** on startup
- **HTTPS support** for production
- **Request size limits** to prevent DoS attacks
- **Comprehensive logging** for security monitoring

## 📊 Monitoring

The application provides several monitoring endpoints:

- **Health check** (`/api/health`) - Basic service health
- **System status** (`/api/health/status`) - Detailed system information
- **Debug endpoint** (`/debug/env`) - Environment configuration (development only)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Staging
```bash
npm run build:staging
npm run start:staging
```

### Production
```bash
npm run build:production
npm run start:production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking:
   ```bash
   npm run lint:check
   npm run type-check
   ```
5. Commit your changes
6. Push to your fork
7. Create a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔄 Git Configuration

The `.gitignore` file is configured to:
- ✅ **Include**: `.env.template` (committed to Git)
- ❌ **Exclude**: All other `.env*` files (not committed to Git)

This ensures that:
- The template is available for all developers
- Sensitive environment-specific values are not committed
- Each environment can have its own configuration
