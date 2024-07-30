const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  archived: Joi.boolean().default(false),
});

const postSearchSchema = Joi.object({
  sort: Joi.string().valid('asc', 'desc'),
  search: Joi.string()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .message('Search term must be alphanumeric.'),
});

const schemas = {
  postSchema,
  postSearchSchema,
};

module.exports = { schemas };
