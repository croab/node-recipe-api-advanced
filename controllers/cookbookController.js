// const { update } = require('./../models/recipeModel');
const Cookbook = require('./../models/cookbookModel');
const factory = require('./../controllers/handlerFactory');

// GET ALL COOKBOOKS
exports.getAllCookbooks = factory.getAll(Cookbook);

// GET ONE COOKBOOK
exports.getCookbook = factory.getOne(Cookbook);

// CREATE COOKBOOK
exports.createCookbook = factory.createOne(Cookbook);

// UPDATE COOKBOOK
exports.updateCookbook = factory.updateOne(Cookbook);

// DELETE COOKBOOK
exports.deleteCookbook = factory.deleteOne(Cookbook);