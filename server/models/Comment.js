const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const redisClient = require('../config/redis');
const db = require('./index');

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

Comment.afterCreate(async (comment) => {
  // console.log("comment", comment);
  // const post = await db.Post.findByPk(comment.postId);

  // if (post) {
  //   // Invalidate cache.
  //   await redisClient.v4.del(`post_${post.slug}`);
  // }

  // Retrieve the related Post using the association method provided by Sequelize.
  const post = await comment.getPost();

  if (post) {
    // Invalidate cache.
    await redisClient.v4.del(`post_${post.slug}`);
  }
});

module.exports = Comment;
