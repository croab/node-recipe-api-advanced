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

// INDEXES
reviewSchema.index({ recipe: 1, user: 1 }, { unique: true });

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
  if (stats.length > 0) {
    await Recipe.findByIdAndUpdate(
      recipeId,
      {
        ratingsQuantity: stats[0].numberOfRatings,
        ratingsAverage: stats[0].averageRating
      }
    );
  } else {
    await Recipe.findByIdAndUpdate(
      recipeId,
      {
        ratingsQuantity: 0,
        ratingsAverage: 0
      }
    );
  }
};

// MIDDLEWARE
// Why does pre infinitely loop? (Although I understand why it would not be a correct response)
// No access to 'next' in the callback as it is a post hook
reviewSchema.post('save', function(ext) {
  this.constructor.calcAverageRatings(this.recipe);
});

// FindByIDAnd... are both aliases of findOneAnd...so use the latter
// reviewSchema.pre(/^findOneAnd/, async function(next){
  // 'this' is the current query so...
  // Adding .clone() to allow mongoose to run the query twice
//   const review = await this.findOne().clone();
//   console.log(review);
// });
reviewSchema.post(/^findOneAnd/, async function(doc) {
  // Post gets access to doc so no need for a pre method
  if (doc) await doc.constructor.calcAverageRatings(doc.recipe);
});

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