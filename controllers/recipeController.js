const Recipe = require('./../models/recipeModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

// TOP RECIPES
exports.aliasTopRecipes = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'title,description,price,ratingsAverage,difficulty,preparationTime,cookingTime,serves,dietary';
  next();
};

// RECIPE STATS
exports.getRecipeStats = catchAsync(async (req, res, next) => {
  const stats = await Recipe.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.0 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numberOfRecipes: { $sum: 1 },
        averageRating: { $avg: '$ratingsAverage' }
      }
    },
    {
      $sort: { averageRating: 1 }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

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