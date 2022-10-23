const express = require('express');
const cookbookController = require('./../controllers/cookbookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, recipeController.getAllCookbooks)
  .post(recipeController.createCookbook);

router
  .route('/:id')
  .get(recipeController.getCookbook)
  .patch(recipeController.updateCookbook)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    recipeController.deleteCookbook
  );

module.exports = router;