const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');


passport.use('signup', new localStrategy({
  usernameField: 'username',
  passwordField: 'username',
  passReqToCallback: true
}, async (req, username, _, done) => {
  const { phone } = req.body;
  try {
    const user = await User.create({ username, phone });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));


passport.use('login', new localStrategy({
  usernameField: 'username',
  passwordField: 'username'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}
));