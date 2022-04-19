export interface IEnvironment {
  /**
   * Can be used to check, if we are currently in a production or development setting.
   */
  production: boolean;

  database: {
    /**
     * Adress of the database. In a docker-compose setting, this is usually the name of the Docker Container.
     */
    host: string;
    /**
     * The port that the database listens to. Make sure, that the Docker container with the DB listens to this port!
     */
    port: number; // DB läuft in Docker sowieso immer auf Port 3306
    user: string;
    /**
     * Password for the specified Database-UserEntity.
     */
    password: string;
    /**
     * Name of the Database.
     */
    database: string;
    /**
     * TypeORM synchronize option. If this is true, the Database Schema will be auto-created on every application
     * startup. DO NOT USE THIS IN PRODUCTION!
     */
    synchronize: boolean;

    /**
     * Set to true if migrations should automatically be executed on startup of the Backend.
     */
    runMigrations: boolean;
  };
  /**
   * The time that auto cacheing will cache the elements.
   */
  cacheTime: number;
  /**
   * The maximum number of items that the auto-cacher will concurrently store.
   */
  maxCacheItems: number;

  /**
   * Global throttle setting for every endpoint. Sets the timeframe for throttling. Can be overwritten for specific endpoints by using
   * the @Throttle decorator.
   */
  globalThrottleTtl: number;
  /**
   * Global throttle setting for every endpoint. Sets the maximum number of requests per throttle timeframe. Can be overwritten for specific endpoints by using
   * the @Throttle decorator.
   */
  globalThrottleLimit: number;

  authentication: {
    /**
     * The secret key that is used to sign the JWTs.
     */
    jwtSecret: string;
    /**
     * Amount of time a JWT will stay valid. Use something like 10m to specify minutes or 2h to specify hours.
     */
    jwtExpiration: string;
    /**
     * Argument used for the bcrypt library, that specifies the number of hashes done on the password.
     * Values bigger than 16 will get very computational intensive.
     */
    bcryptSaltRounds: number;
  };

  adminAccount: {
    username: string;
    password: string;
  };

  /**
   * The Port where Nest will listen to for requests.
   */
  backendPort: number;
}
