const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UnauthorizedErr = require('../utils/errors/UnauthorizedErr');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCred = function (email, password) {
  if (!email || !password) {
    throw new UnauthorizedErr('Неверная почта или пароль');
  }

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr('Неверная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedErr('Неверная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
