const mongoose = require('mongoose');
const Recipe = require('./recipeModel')

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
    recipe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe',
      required: [true, 'A review must belong to a recipe']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// STATIC METHODS
reviewSchema.statics.calcAverageRatings = async function(recipeId) {
  // Returns promise
  const stats = await this.aggregate([
    {
      $match: { recipe: recipeId }
    },
    {
      $group: {
        _id: '$recipe',
        numberOfRatings: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);
  console.log(stats);
  await Recipe.findByIdAndUpdate(
    recipeId,
    {
      ratingsQuantity: stats[0].numberOfRatings,
      ratingsAverage: stats[0].averageRating,

    }
  );
};

// MIDDLEWARE
// Why does pre infinitely loop? (Although I understand why it would not be a correct response)
reviewSchema.post('save', function(next) {
  this.constructor.calcAverageRatings(this.recipe);
});
// reviewSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'user',
//     select: 'name'
//     // Also photo
//   }).populate({
//     path: 'recipe',
//     select: 'title -contributingChefs'
//   });
//   next();
// });
reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
    // Also photo
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;