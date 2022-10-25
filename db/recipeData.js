const recipes = (userIds) => {
  return ([
    {
      title: 'Chocolate cake',
      ingredients: [
        {
          ingredientName: 'Egg',
          quantityValue: 2,
          quantityUnit: 'units'
        },
        {
          ingredientName: 'Flour',
          quantityValue: 100,
          quantityUnit: 'grams'
        },
        {
          ingredientName: 'Chocolate',
          quantityValue: 30,
          quantityUnit: 'grams'
        }
      ],
      cuisine: 'Dessert',
      preparationTime: 25,
      cookingTime: 35,
      serves: 8,
      dietary: 'vegetarian',
      difficulty: 'hard',
      price: '$',
      description: 'So much chocolate in one cake!',
      ratingsAverage: 4.6,
      ratingsQuantity: 10,
      contributingChefs: userIds[0]
    },
    {
      title: 'Vegan chocolate brownies',
      ingredients: [
        {
          ingredientName: 'Chia seeds',
          quantityValue: 20,
          quantityUnit: 'grams'
        },
        {
          ingredientName: 'Flour',
          quantityValue: 150,
          quantityUnit: 'grams'
        },
        {
          ingredientName: 'Chocolate',
          quantityValue: 90,
          quantityUnit: 'grams'
        }
      ],
      cuisine: 'Dessert',
      preparationTime: 20,
      cookingTime: 25,
      serves: 8,
      dietary: 'vegan',
      difficulty: 'easy',
      price: '$$',
      description: 'A really nice dessert',
      ratingsAverage: 4.0,
      ratingsQuantity: 3,
      contributingChefs: userIds[1]
    },
    {
      title: 'Victoria sponge cake',
      ingredients: [
        {
          ingredientName: 'Egg',
          quantityValue: 3,
          quantityUnit: 'units'
        },
        {
          ingredientName: 'Flour',
          quantityValue: 200,
          quantityUnit: 'grams'
        },
        {
          ingredientName: 'Jam',
          quantityValue: 60,
          quantityUnit: 'grams'
        }
      ],
      cuisine: 'Dessert',
      preparationTime: 30,
      cookingTime: 40,
      serves: 8,
      dietary: 'vegetarian',
      difficulty: 'medium',
      price: '$$$',
      description: 'A really good cake which serves many people.',
      ratingsAverage: 4.8,
      ratingsQuantity: 5,
      contributingChefs: userIds[2]
    },
    {
      title: 'Jelly',
      ingredients: [
        {
          ingredientName: 'Jelly cubes',
          quantityValue: 20,
          quantityUnit: 'units'
        }
      ],
      cuisine: 'Dessert',
      preparationTime: 5,
      cookingTime: 180,
      serves: 4,
      dietary: '',
      difficulty: 'easy',
      price: '$',
      description: 'Simple but great.',
      ratingsAverage: 4.1,
      ratingsQuantity: 6,
      contributingChefs: userIds[3]
    }
  ]);
};

module.exports = recipes;