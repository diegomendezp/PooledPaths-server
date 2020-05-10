const router = require('express').Router();
const crudController = require('../../controllers/crud.controller');
const Pin = require('../../models/Pin');
const pinController = require('../../controllers/pin.controller');

router.post(
  '/',
  crudController.create(Pin)
);

router.get(
  '/',
  crudController.getAll(Pin)
);

router.get(
  '/:id',
  crudController.getOne(Pin)
);

router.put(
  '/addPin',
  pinController.addPoint
);

router.put(
  '/:id',
  crudController.updateOne(Pin)
);

router.delete(
  '/:id',
  crudController.deleteOne(Pin)
);

module.exports = router;