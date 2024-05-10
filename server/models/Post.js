// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Post extends Model {}

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'post',
  timestamps: true,
  underscored: true,
  paranoid: true,
  indexes: [
    {
      unique: false,
      fields: ['tags'],
      using: 'GIN', // Use GIN index for JSONB field.
    },
  ],
});

module.exports = Post;
