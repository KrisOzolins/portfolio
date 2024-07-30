#!/usr/bin/env node

// Node.js based cache management command line script.
const yargs = require('yargs');

const redisClient = require('../config/redis');

class Cache {
  constructor() {
    this.argv = yargs
      .usage('$0 <cmd> [args]')
      .command(
        'clear',
        'Clear the cache',
        () => {},
        async () => {
          await this.clear();
        },
      )
      .help()
      .alias('help', 'h').argv;
  }

  async clear() {
    const [flushAll, quit] = await Promise.all([
      redisClient.v4.flushAll(),
      redisClient.v4.quit(),
    ]);

    console.log('Cache cleared!');
  }
}

new Cache();
