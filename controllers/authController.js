const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const CustomError = require('./../utils/customError');
const sendEmail = require('./../utils/email');

// GENERATE JSON WEB TOKEN (USED WITHIN CONTROLLER)
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

// HANDLE SIGNUP
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

// HANDLE LOGIN
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

// HANDLE AUTHENTICATION
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

// RESTRICT ROUTES BASED ON USER ROLE
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array
    if (!roles.includes(req.user.role)) {
      return next(new CustomError('You do not have permission to perform this action.', 403));
    }
    next();
  }
}

// FORGOTTEN PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find user if present
  const user = await User.findOne({ email: req.body.email});
  if (!user) {
    return next(new CustomError('This email address does not exist.', 404));
  }
  // Create reset token
  const resetToken = user.createPasswordResetToken();
  // Save and pass in option otherwise save will cause validation against all fields (we only want it for password related!)
  await user.save({ validateBeforeSave: false });
  // Then send reset token via email!
  // Sending plain, unencrypted token here
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
  const message = `Forgotten you password? For now submit a patch req with new password and password confirm to ${resetURL}.`;
  // Want to do more than just send error so cannot use my custom Error handler here
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token - valid for 10 minutes.',
      message: message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.'
    });
  } catch (err) {
    // Reset the reset token
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    // and throw and error
    return next(new CustomError('Error sending email. Try again later.', 500));
  }
});

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  // Queried for expiration so if no user or token has expired, then user will be undefined
  if (!user) {
    return next(new CustomError('Token is invalid or has expired.', 400));
  }
  // Password will be obtained from body
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // Validators will run here on save
  await user.save;

  const token = await generateJWT(user.id);

  // 200 for created
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
};