const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
  pin:
    {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [
        Number
      ]
    }
  ,
  type: {
    type: String,
    enum: ['safety', 'ilumination', 'maintenance']
  }
},
{
  timestamps: true,
});

const Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin;