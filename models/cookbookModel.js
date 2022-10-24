const mongoose = require('mongoose');

// const User = require('./userModel');

const cookbookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A cookbook must have a name'],
      trim: true,
      maxlength: [40, 'A cookbook title must have less than or equal to 40 characters'],
      minlength: [10, 'A toucookbook title must have greater than or equal then 10 characters']
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A cookbook must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price.'
      }
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A cookbook must have a cover image']
    },
    contributingChefs: [
      {
        type: mongoose.Schema.ObjectId,
        reference: 'User'
      }
    ],
    recipes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe'
      }
    ]
  }
);

// MIDDLEWARE
// POPULATE CONTRIBUTING CHEFS
cookbookSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'contributingChefs',
    select: '-__v -passwordChangedOn'
  });
  next();
});

// POPULATE RECIPES
cookbookSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'recipes',
    select: '-__v'
  });
  next();
});

// IF EMBED USED: Turn contributing CHEF ID TO DOCUMENT
// cookbookSchema.pre('save', async function(next) {
//   const contributingChefsPromises = this.contributingChefs.map(async id => await User.findById(id));
//   this.contributingChefs = await Promise.all(contributingChefsPromises);
//   next();
// });

const Cookbook = mongoose.model('Cookbook', cookbookSchema);

module.exports = Cookbook;