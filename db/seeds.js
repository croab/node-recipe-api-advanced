/* seeds.js */
// const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('./../models/userModel');
const Recipe = require('./../models/recipeModel');
const users = require('./userData');
const recipes = require('./recipeData');

seedDB = async () => {
  const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

  mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
  });

  await Recipe.deleteMany();
  await User.deleteMany();

  await User.create(users);

  const allUsers = await User.find();
  const allUserIds = allUsers.map(user => user.id);
  console.log(allUserIds);
  console.log(recipes(allUserIds));
  await Recipe.create(recipes(allUserIds));
};

seedDB();
// User.find({}, vals => console.log(vals));
// .then(() => {
//   mongoose.connection.close();
// });
