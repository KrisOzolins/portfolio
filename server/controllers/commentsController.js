const HttpStatusCode = require('axios').HttpStatusCode;
const db = require('../models');

exports.getComments = (req, res) => {
  db.Comment.findAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    });
};

exports.createComment = async (req, res) => {
  db.Comment.create(({ title, content } = req.body))
    .then((comment) => {
      res.json(comment);
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    });
};

exports.getComment = (req, res) => {
  db.Comment.findByPk(req.params.id)
    .then((comment) => {
      if (!comment) {
        res.status(HttpStatusCode.NotFound).json({ message: 'Comment not found.' });
      } else {
        res.json(comment);
      }
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    });
};

exports.updateComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  db.Comment.update({ content }, { where: { id } })
    .then((result) => {
      if (result[0] === 0) {
        res.status(HttpStatusCode.NotFound).json({ message: 'Comment not found.' });
      } else {
        res.status(HttpStatusCode.Ok).json({ id, content });
      }
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    });
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;

  db.Comment.destroy({ where: { id } })
    .then((result) => {
      if (result === 0) {
        res.status(HttpStatusCode.NotFound).json({ message: 'Comment not found.' });
      } else {
        res.status(HttpStatusCode.Ok).json({ message: 'Comment deleted.' });
      }
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    });
};
