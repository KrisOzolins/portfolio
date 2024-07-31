const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');
const db = require('../models');

// Passport setup
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: `${config.serverBaseUrl}/api/auth/google/callback`,
      scope: ['profile', 'email'],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('Google profile:', profile);

      // Save the profile to the db.
      const [record, created] = await db.User.upsert({
        email: profile.emails[0].value,
        googleId: profile.id,
        photo: profile.photos[0].value,
        fullName: profile.displayName,
        role: 'user',
        verified: true,
        settings: {
          theme: 'dark',
        },
        currentLoginAt: new Date(),
      });

      record.signInCount += 1;
      record.save();

      // console.log('Created user:', record);

      done(null, record);
    },
  ),
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    // cb(null, { id: user.id, username: user.username, name: user.name });
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

module.exports = passport;
