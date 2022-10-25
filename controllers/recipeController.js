const Recipe = require('./../models/recipeModel');
const factory = require('./handlerFactory');

// GET ALL RECIPES
exports.getAllRecipes = factory.getAll(Recipe);

// GET ONE RECIPE
// If a path is provided, the populate function will be used within the factoryHandler
exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' })

// CREATE RECIPE
exports.createRecipe = factory.createOne(Recipe);

// UPDATE RECIPE
exports.updateRecipe = factory.updateOne(Recipe);

// DELETE RECIPE
exports.deleteRecipe = factory.deleteOne(Recipe);