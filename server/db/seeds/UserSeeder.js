const { User } = require('../../models');

async function seedUsers() {
  const users = [
    {
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
      google_id: null,
      photo: null,
    },
  ];

  for (const user of users) {
    await User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });
  }

  console.log('Users seeded!');
}

module.exports = seedUsers;
