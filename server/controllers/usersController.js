const HttpStatusCode = require('axios').HttpStatusCode;
const db = require('../models');
const { generateToken } = require('../helpers/helpers');
const jwt = require('jsonwebtoken');

// let authenticatedUsers = [
//   {
//     id: 1,
//     email: 'test@example.test',
//   },
// ];

exports.getUsers = async (req, res) => {
  try {
    const { search: term } = req.query;
    const query = term ? { where: { username: { [db.Sequelize.Op.like]: `%${term}%` } } } : {};

    // throw new Error('Testing errors...');

    // const users = await db.User.findAll({ order: !req.query.sort ? [['id']] : [['id', req.query.sort]], ...query });
    const users = await db.User.findAllCached('users', { order: !req.query.sort ? [['id']] : [['id', req.query.sort]], ...query });
    res.json(users);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await db.User.findByPk(id);
    const user = await db.User.findOne({ where: isNaN(id) ? { token: id } : { id } });

    if (!user) {
      res.status(HttpStatusCode.NotFound).json({ message: 'User not found.' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // console.log('req:', req.body);
    // console.log((await db.User.findAll()).map((user) => user.dataValues));
    const { email, password, userAgent } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      if (user.banned) {
        res.status(HttpStatusCode.Forbidden).json({ message: 'User is banned.' });
        return;
      }

      const token = generateToken(user.id);
      user.token = token;
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await user.updateLoginData(ip, userAgent, false);
      await user.save();

      // Set JWT as an HTTP-Only cookie.
      res.cookie('jwt', token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production.
        // sameSite: 'strict', // Prevent CSRF attacks.
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days.
      });

      // authenticatedUsers.push(user.toJSON());
      res.json(user.toJSON());
    } else {
      res.status(HttpStatusCode.NotFound).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // const { token } = req.body;
    // authenticatedUsers = authenticatedUsers.filter((user) => user.id != token);
    const user = await db.User.findOne({ where: { token: req.body.token } });

    if (!user) {
      res.status(HttpStatusCode.NotFound).json({ message: 'User not found.' });
      return;
    }

    user.token = null;
    await user.save();

    // res.setHeader('Set-Cookie', 'jwt=; HttpOnly; Max-Age=0');
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully!' });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};

exports.isAuthenticated = async (req, res) => {
  try {
    const { token } = req.body; // req.cookies.jwt;

    if (!token) {
      res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized user.' });
      return;
    }

    // const user = authenticatedUsers.find((user) => user.id == token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findOne({ where: { id: decoded.userId } });

    if (user && user.token === token) {
      res.json(user.toJSON());
    } else {
      res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized user.' });
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
  }
};
