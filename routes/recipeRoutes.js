const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:recipeId/reviews', reviewRouter);

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

module.exports = router;