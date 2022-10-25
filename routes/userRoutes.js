const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// AUTHORIZATION-RELATED
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

// MOSTLY USER-RELATED
// PROTECT ALL ROUTES BELOW THIS MIDDLEWARE
router.use(authController.protect);

router.patch(
  '/update-my-password',
  authController.updatePassword
);

router.patch(
  '/update-me',
  userController.updateMe
);
router.delete(
  '/delete-me',
  userController.deleteMe
);
router.get(
  '/profile',
  userController.getMe,
  userController.getUser
);

// OTHER ROUTES FOR ADMIN
// Use middleware to restrict all below to admin
router.use(authController.restrictTo('admin'));
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
