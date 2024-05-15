const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const transporter = require('./config/mail');
const HttpStatusCode = require('axios').HttpStatusCode;
const Recaptcha = require('./lib/Recaptcha');

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
router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.createPost);
router.get('/posts/:id', postsController.getPost);
router.put('/posts/:id', postsController.updatePost);
router.delete('/posts/:id', postsController.deletePost);

// Comment routes
router.get('/posts/:id/comments', commentsController.getComments);
router.post('/posts/:id/comments', commentsController.createComment);
router.get('/posts/:id/comments/:commentId', commentsController.getComment);
router.put('/posts/:id/comments/:commentId', commentsController.updateComment);
router.delete('/posts/:id/comments/:commentId', commentsController.deleteComment);

// User routes
// ...

// Admin routes
// ...

// Auth routes
// ...

module.exports = router;
