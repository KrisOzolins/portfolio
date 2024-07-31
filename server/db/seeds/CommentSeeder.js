const { Comment } = require('../../models');

async function seedComments() {
  const comments = [
    {
      content: 'Great post!',
      userId: 1, // Assuming a user with ID 1 exists.
      postId: 1, // Assuming a post with ID 1 exists.
    },
  ];

  for (const comment of comments) {
    await Comment.findOrCreate({
      where: { content: comment.content },
      defaults: comment,
    });
  }

  console.log('Comments seeded!');
}

module.exports = seedComments;
