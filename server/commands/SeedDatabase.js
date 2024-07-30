#!/usr/bin/env node

// Node.js based database seeding command line script.
const yargs = require('yargs');

const seedFeatureFlags = require('../db/seeds/FeatureFlagSeeder');
const seedUsers = require('../db/seeds/UserSeeder');
const seedPosts = require('../db/seeds/PostSeeder');
const seedComments = require('../db/seeds/CommentSeeder');

export async function seedDatabase() {
  await seedFeatureFlags();
  await seedUsers();
  await seedPosts();
  await seedComments();

  console.log('Database seeding completed!');
}

class SeedDatabase {
  constructor() {
    this.argv = yargs
      .usage('$0 <cmd> [args]')
      .command(
        'seed [type]',
        'Seed the database with default data',
        (yargs) => {
          yargs.positional('type', {
            type: 'string',
            describe: 'Type of data to seed (feature-flags, posts, comments)',
          });
        },
        async (argv) => {
          if (argv.type === 'feature-flags') {
            await seedFeatureFlags();
          } else if (argv.type === 'users') {
            await seedUsers();
          } else if (argv.type === 'posts') {
            await seedPosts();
          } else if (argv.type === 'comments') {
            await seedComments();
          } else {
            await this.seedAll();
          }
        },
      )
      .help()
      .alias('help', 'h').argv;
  }

  async seedAll() {
    await seedDatabase().catch(console.error);

    console.log('Database seeding completed!');
  }
}

new SeedDatabase();
