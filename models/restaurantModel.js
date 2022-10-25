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
// INDEXES
// restaurantSchema.index({ location:  });

// CREATE RESTAURANT MODEL
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;