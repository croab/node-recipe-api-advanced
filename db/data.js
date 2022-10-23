const recipes = [
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
    preparationTime: 25,
    cookingTime: 35,
    serves: 8,
    dietary: 'vegetarian'
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
    preparationTime: 20,
    cookingTime: 25,
    serves: 8,
    dietary: 'vegan'
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
    preparationTime: 30,
    cookingTime: 40,
    serves: 8,
    dietary: 'vegetarian'
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
    preparationTime: 5,
    cookingTime: 180,
    serves: 4,
    dietary: ''
  }
];

module.exports = recipes;