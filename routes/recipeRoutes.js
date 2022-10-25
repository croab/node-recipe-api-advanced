const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:recipeId/reviews', reviewRouter);

router
  .route('/top-5-recipes')
  .get(recipeController.aliasTopRecipes, recipeController.getAllRecipes);

router
  .route('/')
  .get(recipeController.getAllRecipes)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chef', 'head-chef'),
    recipeController.createRecipe
  );

router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'chef', 'head-chef'),
    recipeController.updateRecipe
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    recipeController.deleteRecipe
  );

module.exports = router;