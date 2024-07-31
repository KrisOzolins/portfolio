const Sequelize = require('sequelize');
const chalk = require('chalk');
const config = require('../config');

if (process.env.NODE_ENV === 'test') {
  module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false, // Disable logging for tests.
  });
} else {
  const sequelize = config.db.uri
    ? new Sequelize(config.db.uri, { logging: false })
    : new Sequelize(config.db.database, config.db.username, config.db.password, {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql',
        dialectOptions: {
          // ssl: !config.dev
          //   ? {
          //       require: true,
          //       rejectUnauthorized: false,
          //     }
          //   : false,
        },
        logging: false, // Toggle console logging.
      });

  // On successful connection.
  sequelize.authenticate().then(() => {
    console.log(` ${chalk.green(`✓`)} Connected to the database successfully.`);
  });

  module.exports = sequelize;
}
