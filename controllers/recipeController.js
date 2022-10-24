// const { update } = require('./../models/recipeModel');
const Recipe = require('./../models/recipeModel');
const ControllerHelper = require('./../utils/controllerHelper');
const CustomError = require('./../utils/customError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// GET ALL RECIPES
exports.getAllRecipes = catchAsync(async (req, res) => {
  const queryConstruct = new ControllerHelper(Recipe, req.query)
                          .filter()
                          .sort()
                          .limitFields()
                          .paginate();
  // The query construct will be returned by each method and be available in .query
  const recipes = await queryConstruct.query;
  res.status(200).json({
    status: 'success',
    results: recipes.length,
    data: {
      recipes: recipes
    }
  });
});

// GET ONE RECIPE
exports.getRecipe = catchAsync(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('reviews');
  console.log(recipe);
  if (!recipe) {
    return next(new CustomError('No recipe found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      recipe: recipe
    }
  });
});

// CREATE RECIPE
exports.createRecipe = catchAsync(async (req, res) => {
  const newRecipe = await Recipe.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      recipe: newRecipe
    }
  });
});

// UPDATE RECIPE
exports.updateRecipe = catchAsync(async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedRecipe) {
    return next(new CustomError('No recipe found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      recipe: updatedRecipe
    }
  });
});

// DELETE RECIPE
exports.deleteRecipe = factory.deleteOne(Recipe);
// exports.deleteRecipe = catchAsync(async (req, res) => {
//   const deletedRecipe = await Recipe.findByIdAndDelete(
//     req.params.id
//   );
//   if (!deletedRecipe) {
//     return next(new CustomError('No recipe found with that id', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });