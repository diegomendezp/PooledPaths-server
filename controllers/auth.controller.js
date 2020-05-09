const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

module.exports.create = async (req, res, next) => {
  req.login(req.user, { session: false }, async (error) => {
    if (error) return next(error);
    const body = { _id: req.user.id, email: req.user.email };

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

    return res.json({ token });
  });
};

module.exports.doLogin = async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user.id, email: user.email };

        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports.getProfile = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      return res.status(200).json({
        user,
        token: req.headers.authorization.split(' ')[1]
      });
    })
    .catch(() => res.status(500).json({ error: 'Server error' }));
};