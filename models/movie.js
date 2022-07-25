const mongoose = require('mongoose');
const validator = require('validator');

const movie = new mongoose.Schema({
  country: {
    require: true,
    type: String,
  },
  director: {
    require: true,
    type: String,
  },
  duration: {
    require: true,
    type: Number,
  },
  year: {
    require: true,
    type: Number,
  },
  description: {
    require: true,
    type: String,
  },
  image: {
    require: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  trailerLink: {
    require: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  thumbnail: {
    require: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
  // ?? id фильма, который содержится в ответе сервиса MoviesExplorer.
  },
  nameRU: {
    require: true,
    type: String,
  },
  nameEN: {
    require: true,
    type: String,
  },
});
