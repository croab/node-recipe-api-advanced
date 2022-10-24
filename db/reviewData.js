const reviews = (userIds, recipeIds) => {
  return ([
    {
      review: 'A great recipe',
      rating: 4,
      user: userIds[0],
      recipe: recipeIds[0]
    },
    {
      review: 'Pretty good, but not great',
      rating: 3,
      user: userIds[1],
      recipe: recipeIds[1]
    },
    {
      review: 'Not bad',
      rating: 2,
      user: userIds[1],
      recipe: recipeIds[1]
    },
    {
      review: 'Perfect!',
      rating: 5,
      user: userIds[2],
      recipe: recipeIds[1]
    },
    {
      review: 'Absolutely awful!',
      rating: 1,
      user: userIds[3],
      recipe: recipeIds[2]
    },
    {
      review: 'Fantastic recipe...',
      rating: 5,
      user: userIds[2],
      recipe: recipeIds[2]
    },
  ]);
};

module.exports = reviews;