const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCred(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign(
        { _id: user._id },
        'my-secret-key',
        // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      console.log(token);
      res.cookie('jwt', token, {
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => res.send(user))
    .catch(next);
};
