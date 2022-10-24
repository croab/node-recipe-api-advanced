const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, recipeController.getAllRecipes)
  .post(recipeController.createRecipe);

router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(recipeController.updateRecipe)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    recipeController.deleteRecipe
  );

router
  .route('/:recipeId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;