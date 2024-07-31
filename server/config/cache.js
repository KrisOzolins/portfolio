const redisClient = require('./redis');
const db = require('../models');

// Overwrite the original findAll method.
// todo: Finish/fix this implementation.
db.BaseModel.findAll = async function (options, redisKey) {
  const cache = await redisClient.getAsync(redisKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const data = await db.BaseModel.findAll(options);

  await redisClient.setAsync(redisKey, JSON.stringify(data));

  return data;
};

module.exports = db.BaseModel;
