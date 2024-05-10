require('dotenv').config();

module.exports = {
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
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET || '',
  },
};
