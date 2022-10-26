/* seeds.js */
// const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('./../models/userModel');
const Recipe = require('./../models/recipeModel');
const Cookbook = require('./../models/cookbookModel');
const Review = require('./../models/reviewModel');
const Restaurant = require('./../models/restaurantModel');
const users = require('./userData');
const recipes = require('./recipeData');
const cookbooks = require('./cookbookData');
const reviews = require('./reviewData');
const restaurants = require('./restaurantData');

seedDB = async () => {
  const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

  mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
  });

  await Cookbook.deleteMany();
  await Recipe.deleteMany();
  await User.deleteMany();
  await Review.deleteMany();
  await Restaurant.deleteMany();

  // CREATE RESTAURANTS
  await Restaurant.create(restaurants());
  const allRestaurants = await Restaurant.find();
  const allRestaurantIds = allRestaurants.map(rest => rest.id);

  // CREATE USERS
  await User.create(users(allRestaurantIds));
  const allUsers = await User.find();
  const allUserIds = allUsers.map(user => user.id);

  // CREATE RECIPES
  await Recipe.create(recipes(allUserIds));
  const allRecipes = await Recipe.find();
  const allRecipeIds = allRecipes.map(recipe => recipe.id);

  // CREATE COOKBOOKS
  await Cookbook.create(cookbooks(allUserIds, allRecipeIds));

  // CREATE REVIEWS
  await Review.create(reviews(allUserIds, allRecipeIds));
};

seedDB();
// User.find({}, vals => console.log(vals));
// .then(() => {
//   mongoose.connection.close();
// });
