// const { update } = require('./../models/recipeModel');
const Cookbook = require('./../models/cookbookModel');
const ControllerHelper = require('./../utils/controllerHelper');
const CustomError = require('./../utils/customError');
const catchAsync = require('./../utils/catchAsync');

// GET ALL COOKBOOKS
exports.getAllCookbooks = catchAsync(async (req, res) => {
  const queryConstruct = new ControllerHelper(Cookbook, req.query)
                          .filter()
                          .sort()
                          .limitFields()
                          .paginate();
  // The query construct will be returned by each method and be available in .query
  const cookbooks = await queryConstruct.query;
  res.status(200).json({
    status: 'success',
    results: cookbooks.length,
    data: {
      cookbooks: cookbooks
    }
  });
});

// GET ONE COOKBOOK
exports.getCookbook = catchAsync(async (req, res) => {
  const cookbook = await Cookbook.findById(req.params.id);
  if (!cookbook) {
    return next(new CustomError('No cookbook found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      cookbook: cookbook
    }
  });
});

// CREATE COOKBOOK
exports.createCookbook = catchAsync(async (req, res) => {
  const newCookbook = await Cookbook.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      cookbook: newCookbook
    }
  });
});

// UPDATE COOKBOOK
exports.updateCookbook = catchAsync(async (req, res) => {
  const updatedCookbook = await Cookbook.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedCookbook) {
    return next(new CustomError('No cookbook found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      cookbook: updatedCookbook
    }
  });
});

// DELETE COOKBOOK
exports.deleteCookbook = catchAsync(async (req, res) => {
  const deletedCookbook = await Cookbook.findByIdAndDelete(
    req.params.id
  );
  if (!deletedCookbook) {
    return next(new CustomError('No cookbook found with that id', 404));
  }
  res.status(200).json({
    status: 'success'
  });
});