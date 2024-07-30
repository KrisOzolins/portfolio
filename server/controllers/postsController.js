const HttpStatusCode = require('axios').HttpStatusCode;
const db = require('../models');
const { schemas } = require('../lib/Validation');

exports.getPostsCount = async (req, res) => {
  try {
    const count = await db.Post.count();
    res.json({ count });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    // console.log(req.query);

    const { error, value } = schemas.postSearchSchema.validate(req.query);

    if (error) {
      // console.log('bad req', error.details);
      // return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
      // return res.status(HttpStatusCode.BadRequest).json({ message: error.details });
      // return;
      return res.status(HttpStatusCode.BadRequest).json({ message: error.message, details: error.details });
    }

    let { search: term } = req.query;
    // term = decodeURIComponent(term).trim();
    const query = term
      ? {
          where: {
            [db.Sequelize.Op.or]: [{ content: { [db.Sequelize.Op.like]: `%${term}%` } }, { title: { [db.Sequelize.Op.like]: `%${term}%` } }],
          },
        }
      : {};

    // Same method signature as findAll, but with caching and the first arg is Redis key.
    const posts = await db.Post.findAllCached('posts', {
      order: !req.query.sort ? [['id']] : [['id', req.query.sort]],
      ...query,
      include: [
        {
          model: db.Comment, // Assuming 'db.Comment' is the Comment model.
          as: 'comments', // Model alias defined in the association, if any.
          include: [
            {
              model: db.User, // Assuming 'db.User' is the User model.
              as: 'user', // Model alias defined in the association for User in Comment, if any.
            },
          ],
        },
      ],
    });

    res.json(posts);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findByPk(id);

    // if (!post) {
    //   res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    //   return; // Early return.
    // }

    if (!post) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    // req.user, req.isAuthenticated(), ...

    const { slug } = req.params;

    // Same method signature as findOne, but with caching and the first arg is Redis key.
    const post = await db.Post.findOneCached(`post_${slug}`, {
      where: { slug },
      include: [{ model: db.Comment, as: 'comments', include: [{ model: db.User, as: 'user' }] }],
    });

    if (!post) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    // const posts = await db.Post.findAll({ where: { tags: { [db.Sequelize.Op.contains]: JSON.stringify(tag) } } });
    const posts = await db.Post.findAll({ where: db.Sequelize.fn('JSON_CONTAINS', db.Sequelize.col('tags'), JSON.stringify(tag)) });

    res.json(posts);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { error, value } = schemas.postSchema.validate(req.body);

    if (error) {
      // console.log('bad req', error.details);
      // return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
      // return res.status(HttpStatusCode.BadRequest).json({ message: error.details });
      // return;
      return res.status(HttpStatusCode.BadRequest).json({ message: error.message, details: error.details });
    }

    const { title, content, tags, archived } = req.body;
    const post = await db.Post.create({ title, content, tags, archived }, { individualHooks: true });
    res.json(post);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { error, value } = schemas.postSchema.validate(req.body, { abortEarly: false });

    if (error) {
      // console.error('err:', error.details);
      return res.status(HttpStatusCode.BadRequest).json({ message: error.message, details: error.details });
      // return;
    }

    const { id } = req.params;
    const { title, content, tags, archived } = req.body;
    const result = await db.Post.update({ title, content, tags, archived }, { where: { id }, individualHooks: true });

    // const post = await db.Post.findByPk(id);

    // if (post) {
    //   post.title = title;
    //   post.content = content;
    //   post.tags = tags;
    //   await post.save();
    // }

    if (result[0] === 0) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      res.status(HttpStatusCode.Ok).json({ id, title, content, tags, archived });
    }

    // res.json(post);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Post.destroy({ where: { id } });

    if (result === 0) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      // res.status(HttpStatusCode.NoContent).send();
      res.status(HttpStatusCode.NoContent).json({ message: 'Post deleted.' });
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const { q: term } = req.query;
    const posts = await db.Note.findAll({ order: [['id', 'desc']], where: { content: { [db.Sequelize.Op.like]: `%${term}%` } } });

    res.json(posts);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await db.Post.findAll({ attributes: ['tags'] });
    const allTags = tags.map((t) => t.tags).flat();
    const uniqueTags = [...new Set(allTags)];

    res.json(uniqueTags);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findByPk(id);

    if (!post) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      post.likes += 1;
      await post.save();
      res.json(post);
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};
