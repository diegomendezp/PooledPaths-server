const router = require('express').Router();
const passport = require('passport');
const authController = require('../../controllers/auth.controller');

router.post('/signup', passport.authenticate('signup', { session: false }), authController.create);

router.post('/login', authController.doLogin);

router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getProfile);

module.exports = router;