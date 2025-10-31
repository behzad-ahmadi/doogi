/**
 * Application configuration
 * Centralized configuration for environment variables and other settings
 */

// Environment
export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const

// URLs and API endpoints
export const URL = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
} as const

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
} as const

// App settings
export const APP = {
  NAME: 'Doogi',
  DESCRIPTION: 'Your AI Companion',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
} as const
