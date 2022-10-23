const express = require('express');
const cookbookController = require('./../controllers/cookbookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, cookbookController.getAllCookbooks)
  .post(cookbookController.createCookbook);

router
  .route('/:id')
  .get(cookbookController.getCookbook)
  .patch(cookbookController.updateCookbook)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    cookbookController.deleteCookbook
  );

module.exports = router;