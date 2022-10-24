/* seeds.js */
// const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('./../models/userModel');
const Recipe = require('./../models/recipeModel');
const Cookbook = require('./../models/cookbookModel');
const users = require('./userData');
const recipes = require('./recipeData');
const cookbooks = require('./cookbookData');

seedDB = async () => {
  const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

  mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
  });

  await Cookbook.deleteMany();
  await Recipe.deleteMany();
  await User.deleteMany();

  // CREATE USERS
  await User.create(users);
  const allUsers = await User.find();
  const allUserIds = allUsers.map(user => user.id);

  // CREATE RECIPES
  await Recipe.create(recipes(allUserIds));
  const allRecipes = await Recipe.find();
  const allRecipeIds = allRecipes.map(recipe => recipe.id);

  // CREATE COOKBOOKS
  await Cookbook.create(cookbooks(allUserIds, allRecipeIds));
};

seedDB();
// User.find({}, vals => console.log(vals));
// .then(() => {
//   mongoose.connection.close();
// });
