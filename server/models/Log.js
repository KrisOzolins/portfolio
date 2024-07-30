const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define(
  'log',
  {
    relation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    relation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additional_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);

module.exports = Log;
