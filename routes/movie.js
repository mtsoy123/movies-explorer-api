const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { getMovies, createMovie, deleteMovie } = require('../controlleres/movie');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      thumbnail: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      trailerLink: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      owner: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/_id',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      thumbnail: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      trailerLink: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~://?#[\]@!$&'()*+,;=.]+/im),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      owner: Joi.string().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
