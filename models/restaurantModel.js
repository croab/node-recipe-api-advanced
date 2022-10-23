const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    location: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      // Lon first then second lat
      coordinates: [Number],
      description: String,
      address: String,
    }
  }
);

// CREATE RESTAURANT MODEL
const Recipe = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;