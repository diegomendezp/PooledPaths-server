const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');


passport.use('signup', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { phone } = req.body;
  try {
    const user = await User.create({ username, password, phone });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));


passport.use('login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.checkPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
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