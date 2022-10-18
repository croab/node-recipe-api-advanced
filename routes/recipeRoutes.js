const express = require('express');
const recipeController = require('./../controllers/recipeController');

const router = express.Router();

router
  .route('/')
  .get(recipeController.getAllRecipes);
  // .get((req, res, next) => res.status(200).json({status: 'success'}));

// router
//   .route('/recipes/:id');

module.exports = router;