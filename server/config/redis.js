const redis = require('redis');
const chalk = require('chalk');
const config = require('../config');
// const bluebird = require('bluebird');
// const redisCommands = require('redis-commands');

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// redis.createClient().then (client => {
//   client = client;

//   client.on('error', (err) => {
//     console.error('Error connecting to Redis', err);
//   });

//   client.on('connect', () => {
//     console.log('Connected to Redis');
//   });
// });

// const client = await redis.createClient()
//   .on('error', err => console.log('Redis Client Error', err))
//   .connect();

const client = redis.createClient({
  legacyMode: true,
  url: config.redis.url,
  // host: 'localhost',
  // port: 6379,
});

client.connect();

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

client.on('connect', () => {
  console.log(` ${chalk.green(`✓`)} Connected to Redis.`);
});

module.exports = client;
