const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  thumbnail: {
    required: true,
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
    type: String,
    required: true,
    // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
