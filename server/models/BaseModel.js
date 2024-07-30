const { Sequelize, Model } = require('sequelize');
const redisClient = require('../config/redis');

class BaseModel extends Model {
  // Get cached data.
  static async findAllCached(redisKey, options) {
    const cache = await redisClient.v4.get(redisKey);

    if (cache) {
      console.log(`Cache (${redisKey}) hit!`);

      let data = JSON.parse(cache);

      if (data.length === 0) {
        console.log('Cache is empty, fetching fresh data...');

        data = await this.findAll(options);

        if (data.length > 0) {
          await redisClient.v4.set(redisKey, JSON.stringify(data), {
            NX: true,
          });
        }
      }

      if (options.order) {
        if (options.order[0][0] === 'id') {
          data.sort((a, b) => (options.order[0][1] === 'asc' ? a.id - b.id : b.id - a.id));
        }
      }

      if (options.where) {
        // const [field, value] = Object.entries(options.where)[0];
        // data = data.filter((user) => user[field] === value);

        // const [field, value] = Object.entries(options.where)[0];
        // const val = value[Object.getOwnPropertySymbols(value)[0]].slice(1, -1).toLowerCase();

        // const orClause = options.where[Sequelize.Op.or][0];
        // const contentLikeValue = orClause.content[Object.getOwnPropertySymbols(orClause.content)[0]];
        // const titleLikeValue = orClause.title[Object.getOwnPropertySymbols(orClause.title)[0]];

        const orClauses = options.where[Sequelize.Op.or];

        const likeValues = orClauses.map((clause) => {
          const [field, condition] = Object.entries(clause)[0];
          return condition[Sequelize.Op.like];
        });

        const val = likeValues.map((v) => v.slice(1, -1).toLowerCase());

        data = data.filter((item) => item.content.toLowerCase().includes(val[0]) || item.title.toLowerCase().includes(val[1]));
      }

      return data;
    }

    const data = await this.findAll(options);
    await redisClient.v4.set(redisKey, JSON.stringify(data), {
      NX: true, // Only set the key if it does not already exist.
    });

    return data;
  }

  static async findOneCached(key, options) {
    const cache = await redisClient.v4.get(key);

    if (cache) {
      console.log(`Cache (${key}) hit!`);
      return JSON.parse(cache);
    }

    const data = await this.findOne(options);
    await redisClient.v4.set(key, JSON.stringify(data), {
      NX: true,
    });

    return data;
  }
}

module.exports = BaseModel;
