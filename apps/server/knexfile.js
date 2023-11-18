/**
 * @typedef {Object} Config
 * @property {Object} development - Development environment configuration.
 * @property {Object} test - Test environment configuration.
 * @property {Object} production - Production environment configuration.
 */

/**
 * @type {Config}
 */
const config = {
  development: {
    client: 'pg',
    pool: {
      max: 40,
    },
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'best_driver_db',
      user: 'postgres',
      password: '123',
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
      loadExtensions: ['.js'],
      extension: 'js',
    },
  },
  test: {
    client: 'pg',
    pool: {
      max: 40,
    },
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'best_driver_db_test',
      user: 'postgres',
      password: '123',
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
      loadExtensions: ['.js'],
      extension: 'js',
    },
  },
};

export default config;
