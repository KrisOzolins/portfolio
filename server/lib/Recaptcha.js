const axios = require('axios');
const config = require('../config');

class Recaptcha {
  static async verify(token) {
    try {
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: config.recaptcha.secret,
          response: token,
        },
      });

      const { data } = response;

      return data.success || false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = Recaptcha;
