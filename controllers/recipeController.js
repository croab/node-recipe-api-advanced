const Recipe = require('./../models/recipeModel');
const ControllerHelper = require('./../utils/controllerHelper');

exports.getAllRecipes = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error'
    });
  }

};

exports.getRecipe = (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }

};

exports.updateRecipe = (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
};

exports.deleteRecipe = (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
};