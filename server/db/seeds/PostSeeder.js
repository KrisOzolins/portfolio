const { Post } = require('../../models');

async function seedPosts() {
  const posts = [
    {
      title: 'Hello, world!',
      content: 'Welcome to the blog!',
      tags: ['welcome', 'hello'],
      userId: 1, // Assuming a user with ID 1 exists.
    },
  ];

  for (const post of posts) {
    await Post.findOrCreate({
      where: { title: post.title },
      defaults: post,
    });
  }

  console.log('Posts seeded!');
}

module.exports = seedPosts;
