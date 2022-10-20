const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  passwordChangedOn: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // THe higher the cost parameter the better but also more CPU intensive
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

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

const User = mongoose.model('User', userSchema);

module.exports = User;
