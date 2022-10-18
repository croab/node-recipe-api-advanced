const mongoose = require('mongoose');

// const ingredientSchema = new mongoose.Schema(
//   {
//     ingredientName: {
//       type: String,
//       required: [true, 'An ingredient must have a name.'],
//       trim: true
//     },
//     quantity: {
//       type: String,
//       required: [true, 'An ingredient must have a quantity.']
//     }
//   }
// );

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A recipe title is required.'],
      trim: true
    },
    ingredients: {
      type: String
    },
    // ingredients: [ingredientSchema],
    // ingredients: {
    //   type: Array,
    //   required: [true, 'A recipe must have ingredients.']
    // },
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
          'gluten-free'
        ],
        message: 'Dietary should be either vegetarian, vegan or gluten-free.'
      }
    }
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;