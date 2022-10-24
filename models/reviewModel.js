const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    // Review schema to go here
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;