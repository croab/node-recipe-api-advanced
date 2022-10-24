const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

// GET ALL REVIEWS
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
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

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});