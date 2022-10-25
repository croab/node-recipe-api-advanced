const express = require('express');
const restaurantController = require('./../controllers/restaurantController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/restaurants-within/:distance/center/:latlng/unit/:unit')
  .get(restaurantController.getRestaurantsWithin);

router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(
    authController.protect,
    authController.restrictTo('head-chef', 'admin'),
    restaurantController.createRestaurant
  );

router
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .patch(
    authController.protect,
    authController.restrictTo('head-chef', 'admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    restaurantController.deleteRestaurant
  );

module.exports = router;