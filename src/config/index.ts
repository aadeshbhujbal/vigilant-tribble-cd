import path from 'path';
import dotenv from 'dotenv';

// Dynamically load the appropriate .env file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

interface AppConfig {
  port: number;
  env: string;
  nodeTlsRejectUnauthorized: boolean;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  nodeTlsRejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0',
};

export default config;
