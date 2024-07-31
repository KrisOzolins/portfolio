const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const redisClient = require('../config/redis');
const BaseModel = require('./BaseModel');
const Email = require('../lib/Email');
const bcrypt = require('bcrypt');

class User extends BaseModel {
  matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  isAdmin = () => this.role === 'admin';

  updateLoginData = async function (ip, userAgent = null, save = true) {
    this.signInCount += 1;
    this.lastLoginAt = this.currentLoginAt;
    this.currentLoginAt = new Date();
    this.lastLoginIp = this.currentLoginIp;
    this.currentLoginIp = ip;

    if (this.lastLoginIp !== ip) {
      await Email.sendEmail('newlogin', {
        content: {
          email: this.email,
          time: this.currentLoginAt,
          ip,
          browser: userAgent ? JSON.stringify(userAgent) : null,
        },
        to: this.email,
        replyTo: 'kris@krisozolins.com',
        subject: 'Detected a new login to your account.',
      });
    }

    if (save) {
      return await this.save();
    } else {
      return this;
    }
  };
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // User's settings and additional data (e.g. phone, etc.).
    settings: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    role: {
      type: DataTypes.ENUM('admin', 'moderator', 'user'),
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN, // todo: Should be a string with a verify token.
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastLoginIp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentLoginIp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signInCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enable2fa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: true,
    underscored: true,
    paranoid: true,
    hooks: {},
  },
);

User.addHook('beforeSave', async (user, options) => {
  // Invalidate cache on user model changes.
  await redisClient.v4.del('users');

  if (!user.changed('password')) {
    return;
  }

  user.password = await user.hashPassword(user.password);
});

module.exports = User;
