const CustomError = require('./../utils/customError');
const ControllerHelper = require('./../utils/controllerHelper');
const catchAsync = require('./../utils/catchAsync');

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // Just for nested GET reviews on recipes
    let filter = {};
    if (req.params.recipeId) filter = { recipe: req.params.recipeId };
    // Below then applies to all
    const queryConstruct = new ControllerHelper(Model.find(filter), req.query)
                            .filter()
                            .sort()
                            .limitFields()
                            .paginate();
    // The query construct will be returned by each method and be available in .query
    const docs = await queryConstruct.query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate('reviews');
    const doc = await query;
    console.log(doc);
    if (!doc) {
      return next(new CustomError('No document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const deletedRecipe = await Model.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRecipe) {
      return next(new CustomError('No recipe found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!doc) {
      return next(new CustomError('No document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });