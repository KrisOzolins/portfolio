const { Sequelize, DataTypes } = require('sequelize');
// const redisClient = require('../config/redis');
const { server, app } = require('../');
const db = require('../models');
const config = require('../config');

beforeAll(async () => {
  console.log('beforeAll');

  // Mock stuff here.
  // ...

  // Prepare the database before running tests.
  await db.sequelize.sync({ alter: true });
  await db.seed();

  // Start the server.
  server.listen(config.port);
});

afterAll(() => console.log('afterAll'));

// Create a new Sequelize instance with an in-memory SQLite database.
// const sequelize = new Sequelize('sqlite::memory:', { logging: false });
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: ':memory:',
//   logging: false, // Disable logging for tests.
// });

// Define the models.
// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// Seed the database with sample data.
// const seedDatabase = async () => {
//   await sequelize.sync({ force: true }); // Create tables.

//   await User.bulkCreate([
//     { name: 'John Doe', email: 'john@example.com', password: 'password' },
//     { name: 'Jane Doe', email: 'jane@example.com' },
//   ]);
// };

module.exports = {
  // redisClient,
  // sequelize,
  // User,
  // seedDatabase,
  db,
};
