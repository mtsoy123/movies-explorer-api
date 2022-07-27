const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const { celebrate, errors } = require('celebrate');

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const isAuthorised = require('./middlewares/isAuthorised');
const { login, signup, signout } = require('./controlleres/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundErr = require('./utils/errors/NotFoundErr');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(routes);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
    }),
  }),
  signup,
);

app.use(isAuthorised);

app.get('/signout', signout);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
});

app.listen(PORT, 'localhost');
