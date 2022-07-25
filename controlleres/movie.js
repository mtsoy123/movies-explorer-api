const Movie = require('../models/movie');
const { CREATED } = require('../utils/errors/statusCodes');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailerLink: trailer,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.body._id;

  Movie.deleteOne({ movieId })
    .then((movie) => res.send(movie))
    .catch(next);
};
