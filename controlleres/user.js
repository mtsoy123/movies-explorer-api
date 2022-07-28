const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestErr = require('../utils/errors/BadRequestErr');
const ConflictErr = require('../utils/errors/ConflictErr');
const { DUPLICATE_ERROR, CREATED } = require('../utils/errors/statusCodes');
const NotFoundErr = require('../utils/errors/NotFoundErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const opts = { runValidators: true, new: true };

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findOneAndUpdate(req.user._id, { email, name }, opts)
    .then((user) => {
      if (!user) {
        next(new NotFoundErr('Пользователь по указанному _id не найден.'));
        return;
      }

      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCred(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }
      next(err);
    });
};

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.code === DUPLICATE_ERROR) {
        next(new ConflictErr('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }
      next(err);
    });
};

module.exports.signout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
