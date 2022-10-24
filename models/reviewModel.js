const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review is required.']
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    recipe: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe',
        required: [true, 'A review must belong to a recipe']
      }
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A review must belong to a user']
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;