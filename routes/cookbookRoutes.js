const express = require('express');
const cookbookController = require('./../controllers/cookbookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(cookbookController.getAllCookbooks)
  .post(
    authController.protect,
    authController.restrictTo('head-chef', 'admin'),
    cookbookController.createCookbook
  );

router
  .route('/:id')
  .get(cookbookController.getCookbook)
  .patch(
    authController.protect,
    authController.restrictTo('head-chef', 'admin'),
    cookbookController.updateCookbook
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'head-chef'),
    cookbookController.deleteCookbook
  );

module.exports = router;