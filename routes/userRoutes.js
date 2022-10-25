const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// CUSTOM ROUTES FOR AUTHORIZATION
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post(
  '/forgotten-password',
  authController.forgotPassword
);
router.patch(
  '/reset-password/:token',
  authController.resetPassword
);
router.patch(
  '/update-my-password',
  authController.protect,
  authController.updatePassword
);

// CUSTOM ROUTES FOR USERS
router.patch(
  '/update-me',
  authController.protect,
  userController.updateMe
);
router.delete(
  '/delete-me',
  authController.protect,
  userController.deleteMe
);
router.get(
  '/profile',
  authController.protect,
  userController.getMe,
  userController.getUser
);

// OTHER ROUTES
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
