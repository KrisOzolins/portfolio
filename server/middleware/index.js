const accessLogStream = require('../config/logs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const session = require('express-session');
const json = require('express-json');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const db = require('../models');
const config = require('../config');
let passport = null;
if (process.env.NODE_ENV !== 'test') {
  passport = require('../config/passport');
}

// const SQLiteStore = require('connect-sqlite3')(session);
// const RedisStore = require('connect-redis').default;

module.exports = (app, corsOptions) => {
  if (process.env.NODE_ENV === 'test') {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(json());
    // app.use(helmet());
    app.use(cookieParser());
    app.use(cors({ origin: '*' }));
    // app.use(csrf());
    return;
  }

  app.use((req, res, next) => {
    console.log('Request time:', Date.now());
    next();
  });
  app.use(logger);
  app.use(cors(corsOptions)); // Enable CORS for all requests.
  // app.use(csrf());
  app.use(bodyParser.json()); // Enable JSON parsing for request bodies.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(json()); // Set Content-Type to text/plain if Accept header doesn't contain application/json.
  app.use(helmet()); // Set security-related HTTP headers.
  app.use(morgan('combined', { stream: accessLogStream })); // Log HTTP requests.
  app.use(cookieParser()); // Enable cookie parsing.

  // Session setup
  // app.enable('trust proxy');
  // const RedisStore = (require('connect-redis').default)(session);
  app.use(
    session({
      secret: config.session.secret,
      resave: false, // Don't save session if unmodified.
      saveUninitialized: false, // Don't create session until something stored.
      // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
      // store: new RedisStore({ host: 'localhost', port: 6379, logErrors: true }),
      store: new (require('connect-redis').default)({ client: db.redisClient.v4, prefix: 'sess:' }),
      // cookie: {
      //   // sameSite: 'none',
      //   // secure: true
      //   // httpOnly: false,
      // },
    }),
  );
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(passport.authenticate('session'));
};
