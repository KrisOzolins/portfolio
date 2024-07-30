// import jwt from 'jsonwebtoken';
const HttpStatusCode = require('axios').HttpStatusCode;
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/helpers');
const db = require('../models');
const User = db.User;

const oauthProtect = asyncHandler(async (req, res, next) => {
  if (!req.isAuthenticated()) {
    // return res.status(HttpStatusCode.Unauthorized).send('You must be logged in to post a comment.');
    return res.status(HttpStatusCode.Unauthorized).json({ message: 'You must be logged in to post a comment.' });
  }

  next();
});

// User must be authenticated.
const protect = asyncHandler(async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    // For testing purposes, we can set the user directly.
    req.user = await User.findByPk(1); // Or await User.findOne({ where: { id: 1 } });
    next();
    return;
  }

  // Read JWT from the 'jwt' cookie or the 'Authorization' header.
  const token = req.cookies.jwt || (req.headers.authorization?.split(' ')[1]);
  // token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.userId);
      req.token = token;

      if (req.user && req.user.banned) {
        // Allow access to the authenticated check route and the /api/users/:id|:token route.
        if (!req.url.includes('users/authenticated') && !req.url.includes(`users/ey`)) {
          // throw new Error('User is banned.');
          res.status(HttpStatusCode.Unauthorized);
          res.json({ message: 'User is banned.' });
          next();
          return;
        }
      }

      next();
    } catch (error) {
      console.error(error);
      // throw new Error('Not authorized, token failed.');
      res.status(HttpStatusCode.Unauthorized);
      res.json({ message: 'Not authorized, token failed.' });
    }
  } else {
    // throw new Error('Not authorized, no token.');
    res.status(HttpStatusCode.Unauthorized);
    res.json({ message: 'Not authorized, no token.' });
  }
});

// User must be an admin.
const admin = (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // throw new Error('Not authorized as an admin.');
    res.status(HttpStatusCode.Unauthorized);
    res.json({ message: 'Not authorized as an admin.' });
  }
};

// User must be either admin or the user to who the resource belongs.
const ownerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isAdmin() || (req.user.id == req.params.id && !req.params.id.includes(`ey`)) || req.params.id.includes(`ey`))) {
    next();
  } else {
    // throw new Error('Not authorized as an admin or the owner of the resource.');
    res.status(HttpStatusCode.Unauthorized);
    res.json({ message: 'Not authorized as an admin or the owner of the resource.' });
  }
};

// export { protect, admin };
module.exports = { oauthProtect, protect, admin, ownerOrAdmin };
