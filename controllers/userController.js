const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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
