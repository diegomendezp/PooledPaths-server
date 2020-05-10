const Pin = require('../models/Pin');

module.exports.addPoint = (req, res, next) => {
  Pin.findOneAndUpdate({ user: req.user._id},  { $push: { pins: req.body.pin }}, { new: true })
    .then(pin => {
      return res.json(pin);
    })
    .catch(next);
};