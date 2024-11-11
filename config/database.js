const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');  // Set the default to postgres

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'), // Use DATABASE_URL if provided
        host: env('DATABASE_HOST', 'ep-young-base-a5vlbksq.us-east-2.aws.neon.tech'),  // Your PostgreSQL host
        port: env.int('DATABASE_PORT', 5432),   // PostgreSQL default port
        database: env('DATABASE_NAME', 'ai-resume-admin'),   // Your database name
        user: env('DATABASE_USERNAME', 'ai-resume-admin_owner'), // Your username
        password: env('DATABASE_PASSWORD', 'btg6SsZJ0YGp'), // Your password
        ssl: env.bool('DATABASE_SSL', true) && {   // Ensure SSL is required
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
