const CustomError = require('../utils/customError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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

// FOR ADMIN =====
// GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  });
});

// GET ONE USER
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

// CREATE USER (INCOMPLETE)
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

// UPDATE USER (INCOMPLETE)
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

// DELETE USER (INCOMPLETE)
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
