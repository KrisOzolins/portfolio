// Email service.
const ejs = require('ejs');
const transporter = require('../config/mail');
const config = require('../config');

class Email {
  constructor() {}

  static async sendEmail(template, data) {
    if (config.env === 'test') {
      const message = `Email (using ${template}.ejs) message sent successfully!`;
      console.log(message);
      return { message };
    }

    // Compile EJS template to HTML.
    const html = await ejs.renderFile(__dirname + `/../views/mails/${template}.ejs`, data.content);

    const mailOptions = {
      from: 'kris@krisozolins.com',
      to: data.to,
      replyTo: data.replyTo,
      subject: data.subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return { error: `Error sending email. ${error.message}` };
      }

      // console.log('Email sent: ' + info.response);
      return { message: 'Message sent successfully!' };
    });
  }
}

module.exports = Email;
