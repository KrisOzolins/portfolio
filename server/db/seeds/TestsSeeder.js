const chalk = require('chalk');

module.exports = async function seed(User, Post, Comment, FeatureFlag, Log) {
  // await sequelize.sync({ force: true });

  // Create or change user for testing Redis cache invalidation in User model beforeSave hook.
  // const [user, created] = await User.findOrCreate({
  //   where: { username: 'someone' },
  //   defaults: {
  //     username: 'someone',
  //     email: 'someone@example.com',
  //     password: 'test',
  //     settings: {
  //       theme: 'dark',
  //     },
  //     // isAdmin: true,
  //     role: 'admin',
  //     verified: true,
  //     token: null,
  //     googleId: null,
  //     photo: null,
  //   },
  // });

  // Seed the database with a default admin user.
  if ((await User.count()) === 0) {
    const [user, created] = await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        username: 'admin',
        email: 'kris.ozolins@gmail.com',
        password: 'test',
        settings: {
          theme: 'dark',
        },
        // isAdmin: true,
        role: 'admin',
        verified: true,
        token: null,
        googleId: null,
        photo: null,
      },
    });

    if (created) {
      console.log('Admin user created!');
    }
  }

  // Seed the database with a default example feature flag.
  if ((await FeatureFlag.count()) === 0) {
    // Add a feature flag.
    const [featureFlag, createdFeatureFlag] = await FeatureFlag.findOrCreate({
      where: { name: 'example-feature' },
      defaults: {
        name: 'example-feature',
        enabled: true,
        type: 'flag',
        description: 'An example feature flag.',
      },
    });

    // Add an A/B test.
    const [ab, createdAB] = await FeatureFlag.findOrCreate({
      where: { name: 'example-ab' },
      defaults: {
        name: 'example-ab',
        enabled: true,
        type: 'ab',
        description: 'An example AB test.',
      },
    });

    if (createdFeatureFlag && createdAB) {
      console.log('Feature flags created!');
    }
  }

  // Seed posts.
  if ((await Post.count()) === 0) {
    const [post, createdPost] = await Post.findOrCreate({
      where: { title: 'Hello, world!' },
      defaults: {
        title: 'Hello, world!',
        content: 'Welcome to the blog!',
        tags: ['welcome', 'hello'],
        userId: 1,
      },
    });

    if (createdPost) {
      console.log('Post created!');
    }
  }

  // Seed comments.
  if ((await Comment.count()) === 0) {
    const [comment, createdComment] = await Comment.findOrCreate({
      where: { content: 'Great post!' },
      defaults: {
        content: 'Great post!',
        userId: 1,
        postId: 1,
      },
    });

    if (createdComment) {
      console.log('Comment created!');
    }
  }

  // Seed logs.
  if ((await Log.count()) === 0) {
    const [log, createdLog] = await Log.findOrCreate({
      where: { relation_id: 1, relation_type: 'post' },
      defaults: {
        userId: 1,
        relation_value: 'Post created',
        additional_data: { title: 'Hello, world!' },
      },
    });

    if (createdLog) {
      console.log('Log created!');
    }
  }

  console.log(` ${chalk.green(`✓`)} Database seeded!`);
};
