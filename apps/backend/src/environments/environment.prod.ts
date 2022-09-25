/**
 * Environment variables in a production setting. These do not have default values and have to be set!
 */
export const environment = {
  production: true,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    runMigrations: process.env.DB_RUN_MIGRATIONS === 'true',
  },
  cacheTime: Number(process.env.CACHE_TIME),
  maxCacheItems: Number(process.env.MAX_CACHE_ITEMS),
  globalThrottleLimit: Number(process.env.GLOBAL_THROTTLE_LIMIT),
  globalThrottleTtl: Number(process.env.GLOBAL_THROTTLE_TTL),
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUND),
  },
  adminAccount: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  backendPort: Number(process.env.BACKEND_PORT),
};
