const { celebrate } = require('celebrate');
const Joi = require('joi');
const { validateLink } = require('../utils/regexp');

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(validateLink),
    thumbnail: Joi.string().required().regex(validateLink),
    trailerLink: Joi.string().required().regex(validateLink),
    nameRU: Joi.string().required(),
    movieId: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserPatch = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
});
