const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const CustomError = require('./../utils/customError');

const generateJWT = id => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      },
      // Callback permitted in the .sign function for async
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

// Async because uses db operations
exports.signup = catchAsync(async (req, res, next) => {
  // The below prevents used from specifying their admin role!
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedOn: req.body.passwordChangedOn
  });

  const token = await generateJWT(newUser._id);

  // 201 for created
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and pass exist
  if (!email || !password) {
    // Return causes login to finish right away
    return next(new CustomError('Please provide email and password.', 400));
  }
  // Check if user exists and password correct
  // +password allows an unselected field (in model) to be selected
  const user = await User.findOne({ email: email }).select('+password');
  // The method from the model is available on all User model instances
  // user here is the result of a query so an instance
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new CustomError('Incorrect email or password', 401));
  }

  // If everything is ok, send the jwt to client
  const token = await generateJWT(user._id);
  res.status(200).json({
    status: 'success',
    token: token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Get token and check it exists
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new CustomError('You are not logged in. Please login for access.', 401)
    );
  }
  // 2. Verification of token
  // Errors handled within errorController
  const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3. Check user trying to access route still exists
  const currentUser = await User.findById(decodedPayload.id);
  if (!currentUser) {
    return next(new CustomError('The user belonging to the token no longer exists.', 401));
  }
  // 4. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decodedPayload.iat)) {
    return next(new CustomError('User recently changed password. Please login again.', 401));
  };
  // Otherwise will grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array
    if (!roles.includes(req.user.role)) {
      return next(new CustomError('You do not have permission to perform this action.', 403));
    }
    next();
  }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email});
  if (!user) {
    return next(new CustomError('This email address does not exist.', 404));
  }
});

exports.resetPassword = (req, res, next) => {

};