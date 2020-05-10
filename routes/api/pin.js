const router = require('express').Router();
const crudController = require('../../controllers/crud.controller');
const Pin = require('../../models/Pin');
const passport = require('passport');
const pinController = require('../../controllers/pin.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  crudController.create(Pin)
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  crudController.getAll(Pin)
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  crudController.getOne(Pin)
);

router.put(
  '/addPin',
  passport.authenticate('jwt', { session: false }),
  pinController.addPoint
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  crudController.updateOne(Pin)
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  crudController.deleteOne(Pin)
);

module.exports = router;