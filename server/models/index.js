const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Associations
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

// Export models and Sequelize instance
const db = {
  sequelize,
  Sequelize,
  User,
  Post,
  Comment,
};

module.exports = db;
