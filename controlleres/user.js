// const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUserInfo = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findOneAndUpdate(req.user._id, { email, name })
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(() => {
      next();
    });
};
