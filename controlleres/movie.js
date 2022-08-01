const Movie = require('../models/movie');
const { CREATED } = require('../utils/errors/statusCodes');
const NotFoundErr = require('../utils/errors/NotFoundErr');
const BadRequestErr = require('../utils/errors/BadRequestErr');
const ForbiddenErr = require('../utils/errors/ForbiddenErr');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
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
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
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
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    owner: userId,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }

      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .orFail(() => next(new NotFoundErr('Фильм не найден')))
    .then((movie) => {
      // movie.owner is array?
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenErr('Вы пытаетесь удалить чужой фильм'));
      }
      return movie.remove()
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }
      next(err);
    });
};
