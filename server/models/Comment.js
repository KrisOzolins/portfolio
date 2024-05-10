const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define(
  'comment',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);

module.exports = Comment;
