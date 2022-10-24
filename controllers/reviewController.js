const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// GET ALL REVIEWS
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.recipeId) filter = { recipe: req.params.recipeId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews: reviews
    }
  });
});

// CREATE REVIEW
exports.createReview = catchAsync(async (req, res, next) => {
  // Set to account for nested routes
  if (!req.body.recipe) req.body.recipe = req.params.recipeId;
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.body.user);
  console.log(req.body.recipe);
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

// DELETE REVIEW
exports.deleteReview = factory.deleteOne(Review);