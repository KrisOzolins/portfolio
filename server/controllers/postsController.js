const HttpStatusCode = require('axios').HttpStatusCode;
const db = require('../models');

exports.getPosts = async (req, res) => {
  try {
    const { search: term } = req.query;
    const query = term ? { where: { content: { [db.Sequelize.Op.like]: `%${term}%` } } } : {};

    const posts = await db.Post.findAll({ order: !req.query.sort ? [['id']] : [['id', req.query.sort]], ...query });
    res.json(posts);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await db.Post.create({ title, content, tags });
    res.json(post);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = db.Post.findByPk(id);

    if (!post) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const result = await db.Post.update({ title, content, tags }, { where: { id } });

    if (result[0] === 0) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Post not found.' });
    } else {
      // res.status(HttpStatusCode.NoContent).send();
      res.status(HttpStatusCode.Ok).json({ id, title, content, tags });
    }
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

// exports.exportNotes = (req, res) => {
//   try {
//     db.Note.findAll({ order: [['id']] }).then((notes) => {
//       NotesService.exportToMarkdown(notes);

//       setTimeout(() => {
//         res.json({ message: 'Notes exported.' });
//       }, 3000);
//     });
//   } catch (error) {
//     res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
//   }
// };

// exports.importNotes = async (req, res) => {
//   try {
//     const notes = await NotesService.importFromMarkdown();

//     // notes.forEach((note) => {
//     // db.Note.upsert(note);
//     // });
//     for (let note of notes) {
//       await db.Note.upsert(note);
//     }

//     setTimeout(() => {
//       res.json({ message: 'Notes imported.' });
//     }, 3000);
//   } catch (error) {
//     res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
//   }
// };
