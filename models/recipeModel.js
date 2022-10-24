const mongoose = require('mongoose');
const slugify = require('slugify');

// INGREDIENT SUBSCHEMA
const ingredientSchema = new mongoose.Schema(
  {
    ingredientName: {
      type: String,
      required: [true, 'An ingredient must have a name.'],
      trim: true
    },
    quantityValue: {
      type: Number,
      required: [true, 'An ingredient must have a quantity.']
    },
    quantityUnit: {
      type: String,
      required: [true, 'An quantity must have a unit.']
    }
  }
);

// RECIPE SCHEMA
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A recipe title is required.'],
      trim: true
    },
    slug: String,
    ingredients: [ingredientSchema],
    cuisine: {
      type: String,
      required: [true, 'A recipe must belong to a cuisine.']
    },
    preparationTime: {
      type: Number,
      required: [true, 'A recipe must have a prep time.']
    },
    cookingTime: {
      type: Number,
      required: [true, 'A recipe must have a cooking time.']
    },
    serves: {
      type: Number,
      required: [true, 'A recipe must have a serving size.'],
      min: [1, 'Serving size must be at least 1.']
    },
    dietary: {
      type: String,
      enum: {
        values: [
          'vegetarian',
          'vegan',
          'gluten-free',
          ''
        ],
        message: 'Dietary should be either an empty string, vegetarian, vegan or gluten-free.'
      }
    },
    difficulty: {
      type: String,
      enum: {
        values: [
          'easy',
          'medium',
          'hard'
        ],
        message: 'Difficulty should be either easy, medium or hard.'
      }
    },
    price: {
      type: String,
      enum: {
        values: [
          '$',
          '$$',
          '$$$'
        ],
        message: 'Price should be either $, $$, or $$$.'
      }
    },
    contributingChefs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  }
  // SHOULD CHECK IF ADDITIONAL FIELDS NEED TO BE HPP WHITELISTED
);

// PRE-SAVE CALLBACKS
recipeSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

recipeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'contributingChefs',
    select: '-__v -passwordChangedOn'
  });
  next();
});

// CREATE RECIPE MODEL
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;