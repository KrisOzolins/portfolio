require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// console.log('NODE_ENV:', process.env.NODE_ENV);

module.exports = {
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:3000', // clientUrl
  serverBaseUrl: process.env.SERVER_BASE_URL || 'http://localhost:3001',
  dev: process.env.NODE_ENV !== 'production',
  env: process.env.NODE_ENV || 'development',
  port: process.env.NODE_PORT || 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'portfolio',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    uri: process.env.DB_URI || '',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  mail: {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 25,
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },
  jwt: {
    secret: process.env.JWT,
  },
  session: {
    secret: process.env.SESSION_SECRET || '',
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET || '',
  },
  dropbox: {
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  },
  newRelic: {
    appName: process.env.NEW_RELIC_APP_NAME || 'Portfolio Node.js API',
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
};
