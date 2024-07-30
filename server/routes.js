const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const transporter = require('./config/mail');
const HttpStatusCode = require('axios').HttpStatusCode;
const Recaptcha = require('./lib/Recaptcha');
const { oauthProtect, protect, admin, ownerOrAdmin } = require('./middleware/auth');
const passport = require('passport');
const db = require('./models');
const config = require('./config');

// Inline routes
router.get('/', (req, res) => {
  // res.send('Hello World!'); // Send a simple text response.
  res.json({ message: 'Welcome to the API.' }); // Send a JSON response.
});

router.get('/contact-email-preview', (req, res) => {
  res.render('mails/contact', { name: 'John Doe', message: 'Hello, world!' });
});

router.post('/contact', async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  // Simple validation.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  if (!email.match(emailRegex)) errors.email = 'Email is invalid.';
  if (!message) errors.message = 'Message is required.';
  if (Object.keys(errors).length > 0) {
    res.status(HttpStatusCode.BadRequest).json({ message: 'Validation failed.', errors });
    return;
  }

  // Verify reCAPTCHA.
  const recaptchaSuccess = await Recaptcha.verify(token);
  if (!recaptchaSuccess) {
    res.status(HttpStatusCode.BadRequest).json({ message: 'reCAPTCHA verification failed.' });
    return;
  }

  // Compile EJS template to HTML.
  const html = await ejs.renderFile(__dirname + '/views/mails/contact.ejs', { name, message });

  const mailOptions = {
    from: 'kris@krisozolins.com',
    to: 'kris@krisozolins.com',
    replyTo: email,
    subject: `New message from krisozolins.com contact form.${subject ? ` [subject: ${subject}]` : ''}`,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email.' });
      return;
    }
    console.log('Email sent: ' + info.response);
    res.status(HttpStatusCode.Ok).json({ message: 'Message sent successfully!' });
  });
});

router.get('/download/cv', (req, res) => {
  const file = `${__dirname}/public/Resume-en.pdf`;
  res.download(file);
});

router.get('/details', (req, res) => {
  const fs = require('fs');
  const path = require('path');

  const mdDir = `${__dirname}/public/md`;
  const files = fs.readdirSync(mdDir);
  const details = files.map((file) => {
    const filePath = path.join(mdDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return { file, content };
  });

  res.json({ details });
});

const usersController = require('./controllers/usersController');
const postsController = require('./controllers/postsController');
const commentsController = require('./controllers/commentsController');

// Controllers
// Post routes
router.get('/posts/count', postsController.getPostsCount);
router.get('/posts', postsController.getPosts);
router.get('/posts/tags', postsController.getTags);
router.post('/posts', protect, admin, postsController.createPost);
router.post('/posts/:id/like', postsController.likePost);
router.get('/posts/:id', postsController.getPost);
router.put('/posts/:id', protect, admin, postsController.updatePost);
router.delete('/posts/:id', protect, admin, postsController.deletePost);
router.get('/posts/slug/:slug', postsController.getPostBySlug);
router.get('/posts/tag/:tag', postsController.getPostsByTag);

// Comment routes
// router.get('/posts/:id/comments', commentsController.getComments);
router.post('/posts/:id/comments', oauthProtect, commentsController.createComment);
// router.get('/posts/:id/comments/:commentId', commentsController.getComment);
// router.put('/posts/:id/comments/:commentId', commentsController.updateComment);
// router.delete('/posts/:id/comments/:commentId', commentsController.deleteComment);

// User routes
router.get('/users', protect, admin, usersController.getUsers);
router.get('/users/:id', protect, ownerOrAdmin, usersController.getUser);
router.post('/users/login', usersController.login);
router.post('/users/logout', usersController.logout);
router.post('/users/authenticated', usersController.isAuthenticated);
// ...

// Admin routes
// ...

// Auth routes
// ...

// Feature flag routes
router.get('/feature-flags/:name', (req, res) => {
  // res.json({ name: req.params.name, enabled: true });
  db.FeatureFlag.findOne({ where: { name: req.params.name } }).then((featureFlag) => {
    if (!featureFlag) {
      res.status(HttpStatusCode.NotFound).json({ message: 'Feature flag not found.' });
    } else {
      res.json({ name: featureFlag.name, enabled: featureFlag.enabled });
    }
  });
});

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: `${config.publicBaseUrl}/blog`,
    failureRedirect: `${config.publicBaseUrl}/blog`,
    failureMessage: true,
    keepSessionInfo: true,
  }),
  // (req, res) => {
  // Save user to the db.
  // db.User.findOrCreate({
  //   // where: { google_id: req.user.id },
  //   where: { email: req.user.emails[0].value },
  //   defaults: {
  //     email: req.user.emails[0].value,
  //     googleId: req.user.id,
  //     photo: req.user.photos[0].value,
  //     fullName: req.user.displayName,
  //     role: 'user',
  //     verified: true,
  //     settings: {
  //       theme: 'dark',
  //     },
  //     lastLogin: new Date(),
  //   }
  // }).then(([user, created]) => {
  //   console.log('User created:', created);
  // });
  // res.redirect('http://localhost:3000/blog'); // Redirect back to the app.
  // }
);
router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    // res.redirect('http://localhost:3000/blog');
    res.status(200).json({ message: 'Logout successful.' });
  });
});
router.get('/auth/user', (req, res) => {
  // console.log('req.user:', req.user);
  // console.log('is authenticated:', req.isAuthenticated());
  res.send(req.user);
});

module.exports = router;
