import { IEnvironment } from './environment-interface';

/**
 * Environment variables in a development setting. Every variable has a default value.
 */
export const environment: IEnvironment = {
  production: false,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'test',
    database: process.env.DB_DATABASE || 'stockeer',
    synchronize: Boolean(process.env.DB_SYNCHRONIZE) ?? false,
    runMigrations: Boolean(process.env.DB_RUN_MIGRATIONS ?? true),
  },
  cacheTime: Number(process.env.CACHE_TIME) || 3,
  maxCacheItems: Number(process.env.MAX_CACHE_ITEMS) || 10,
  globalThrottleLimit: Number(process.env.GLOBAL_THROTTLE_LIMIT) || 360,
  globalThrottleTtl: Number(process.env.GLOBAL_THROTTLE_TTL) || 120,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'basic-secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '120m',
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUND) || 12,
  },
  adminAccount: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin',
  },
  backendPort: Number(process.env.BACKEND_PORT) || 3333,
};
