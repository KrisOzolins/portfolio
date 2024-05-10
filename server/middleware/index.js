const accessLogStream = require('../config/logs');
const bodyParser = require('body-parser');
const cors = require('cors');
const json = require('express-json');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');

module.exports = (app, corsOptions) => {
  app.use((req, res, next) => {
    console.log('Request time:', Date.now());
    next();
  });
  app.use(logger);
  app.use(cors(corsOptions)); // Enable CORS for all requests.
  app.use(bodyParser.json()); // Enable JSON parsing for request bodies.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(json()); // Set Content-Type to text/plain if Accept header doesn't contain application/json.
  app.use(helmet()); // Set security-related HTTP headers.
  app.use(morgan('combined', { stream: accessLogStream })); // Log HTTP requests.
};
