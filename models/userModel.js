const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// USER SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.']
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'A valid email is required.']
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'chef', 'head-chef', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minLength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      // Need access to this here so no arrow function
      // Only runs on CREATE and SAVE!
      validator: function(el) {
        return el === this.password;
      }
    },
    message: 'Passwords should be the same.'
  },
  passwordChangedOn: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});
// =====================================================================
// PRE-SAVE CALLBACKS
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // THe higher the cost parameter the better but also more CPU intensive
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
// =====================================================================
// INSTANCE METHODS
// CHECK PASSWORD
userSchema.methods.checkPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// CHECK IF PASSWORD WAS CHANGED AFTER JWT EXPIRATION
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedOn) {
    const changedTimestamp = parseInt(
      this.passwordChangedOn.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// CREATE PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({resetToken}, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + (10 * 60 * 1000);
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
