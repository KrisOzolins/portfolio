const nodemailer = require('nodemailer');
const config = require('../config');

// console.log("mail user:", config.mail.user);

const transporter = nodemailer.createTransport({
  // sendmail: true,
  // newline: 'unix',
  // path: '/usr/sbin/sendmail',
  // service: 'gmail',
  service: 'sendgrid',
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

module.exports = transporter;
