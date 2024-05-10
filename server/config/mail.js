const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  // sendmail: true,
  // newline: 'unix',
  // path: '/usr/sbin/sendmail',
  service: 'gmail',
  // service: "sendgrid",
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

module.exports = transporter;
