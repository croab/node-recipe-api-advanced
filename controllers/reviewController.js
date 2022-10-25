const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// GET ALL REVIEWS
exports.getAllReviews = factory.getAll(Review);

// SET RECIPE AND USER IDs
exports.setRecipeAndUserIds = (req, res, next) => {
  if (!req.body.recipe) req.body.recipe = req.params.recipeId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// GET REVIEW
exports.getReview = factory.getOne(Review);

// CREATE REVIEW
exports.createReview = factory.createOne(Review);

// UPDATE REVIEW
exports.updateReview = factory.updateOne(Review);

// DELETE REVIEW
exports.deleteReview = factory.deleteOne(Review);