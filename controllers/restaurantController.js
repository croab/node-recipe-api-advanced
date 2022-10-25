const Restaurant = require('./../models/restaurantModel');
const factory = require('./handlerFactory');
const CustomError = require('./../utils/customError');

// GET RESTAURANTS WITHIN
exports.getRestaurantsWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [ lat, lng ] = latlng.split(',');
  if (!lat || !lng) {
    next(new CustomError('Please supply lat and lng in the required format /lat,lng/',400 ));
  }
  // console.log(lat, lng, distance, unit);
  // radius must be in radians
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  const restaurants = await Restaurant.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius]
      }
    }
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: restaurants
    }
  });
};

// GET ALL RESTAURANT
exports.getAllRestaurants = factory.getAll(Restaurant);

// GET RESTAURANT
exports.getRestaurant = factory.getOne(Restaurant);

// CREATE RESTAURANT
exports.createRestaurant = factory.createOne(Restaurant);

// UPDATE RESTAURANT
exports.updateRestaurant = factory.updateOne(Restaurant);

// DELETE RESTAURANT
exports.deleteRestaurant = factory.deleteOne(Restaurant);