const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const redisClient = require('../config/redis');
const BaseModel = require('./BaseModel');
const slugify = require('slugify');

class Post extends BaseModel {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'post',
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
      // {
      //   unique: false,
      //   fields: ['tags'],
      //   using: 'GIN', // Use GIN index for JSONB field.
      // },
    ],
  },
);

const modelHook = async (post, options) => {
  // Invalidate cache on model changes.
  await redisClient.v4.del('posts');

  if (post.title) {
    post.slug = slugify(post.title, {
      lower: true, // Convert to lower case.
      strict: true, // Remove special characters.
      remove: /[*+~.()'"!:@]/g, // Regex to remove certain characters.
    });
  }

  // Invalidate individual post cache too.
  await redisClient.v4.del(`post_${post.slug}`);
};

Post.addHook('beforeValidate', modelHook);
Post.addHook('beforeSave', modelHook);

// Post.afterSave((post, options, fn) => {
//   console.log('Post afterSave hook', post);
//   post.updateAttributes({});
// });

module.exports = Post;
