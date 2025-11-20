import dotenv from 'dotenv';

dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
};
