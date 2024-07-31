const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// todo: Add user-specific feature flags and A/B test result tracking.
const FeatureFlag = sequelize.define(
  'feature_flag',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM('flag', 'ab'),
      allowNull: false,
      defaultValue: 'flag',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);

module.exports = FeatureFlag;
