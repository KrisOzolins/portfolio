const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const redisClient = require('../config/redis');
// const cache = require('../config/cache');
const seed = require('../db/seeds/TestsSeeder');

// Models
const BaseModel = require('./BaseModel');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const FeatureFlag = require('./FeatureFlag');
const Log = require('./Log');

// Associations
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

User.hasMany(Log);
Log.belongsTo(User);

// Export models and Sequelize instance.
const db = {
  // cache,
  redisClient,
  sequelize,
  Sequelize,
  BaseModel,
  User,
  Post,
  Comment,
  FeatureFlag,
  Log,
  // todo: Move this to a seed file/command.
  seed: async function () {
    await seed(User, Post, Comment, FeatureFlag, Log);
  },
  fixIndex: async function () {
    // Temp fix for the duplicate keys issue - https://github.com/sequelize/sequelize/issues/8984.
    const rawTables = await sequelize.query('SHOW TABLES');
    const tables = rawTables[0].map((i) => i[Object.keys(rawTables[0][0])[0]]);
    for (const t of tables) {
      const rawKeys = await sequelize.query(`SHOW INDEX FROM ${t}`);
      const keys = rawKeys[0].map((i) => i['Key_name']).filter((i) => i.match(/[a-zA-Z]+_\d+/));
      for (const k of keys) await sequelize.query(`ALTER TABLE ${t} DROP INDEX ${k}`);
    }
  },
};

module.exports = db;
