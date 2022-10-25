const CustomError = require('../utils/customError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// HELPER FUNCTIONS ===============================
// ...allowedFields creates an array of arguments passed in
const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      filteredObj[el] = obj[el];
    }
  });
  return filteredObj;
};

// CONTROLLER ACTIONS =============================
// FOR CURRENT AUTHENTICATED USER =====
// UPDATE ME
exports.updateMe = catchAsync(async (req, res, next) => {
  // Firstly need to prevent user from posting password data here
  if (req.body.password || req.body.passwordConfirm) {
    return next(new CustomError('This is the wrong location for updating your password. Please do so at /update-my-password', 400));
  }
  // Filter out unwanted fields!
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// DELETE ME
exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { active: false }
  );
  res.status(204).json({
    status: 'success',
    data: null
  })
});

// GET ME
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// ===== FOR ADMIN =====
// GET ALL USERS
exports.getAllUsers = factory.getAll(User);

// GET ONE USER
exports.getUser = factory.getOne(User);

// CREATE USER (CAN BE DELETED)
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

// UPDATE USER
exports.updateUser = factory.updateOne(User);

// DELETE USER
exports.deleteUser = factory.deleteOne(User);
