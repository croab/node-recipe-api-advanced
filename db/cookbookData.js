const cookbooks = (userIDs, recipeIDs) => {
  return ([
    {
      title: 'Great Cookbook',
      price: 25.0,
      priceDiscount: 5.0,
      description: 'A pretty great cookbook by all the best chefs.',
      contributingChefs: [userIDs[0], userIDs[2]],
      recipes: recipeIDs
    },
    {
      title: 'OK Cookbook',
      price: 20.0,
      priceDiscount: 0.0,
      description: 'An average cookbook, with some reasonable chefs.',
      contributingChefs: [userIDs[1]],
      recipes: recipeIDs
    }
  ]);
};

module.exports = cookbooks;