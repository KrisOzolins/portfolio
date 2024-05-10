const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = config.db.uri
  ? new Sequelize(config.db.uri, { logging: false })
  : new Sequelize(config.db.database, config.db.username, config.db.password, {
      host: config.db.host,
      port: config.db.port,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false, // Toggle console logging.
    });

module.exports = sequelize;
