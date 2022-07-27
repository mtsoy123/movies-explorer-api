const Movie = require('../models/movie');
const { CREATED } = require('../utils/errors/statusCodes');
const NotFoundErr = require('../utils/errors/NotFoundErr');
const BadRequestErr = require('../utils/errors/BadRequestErr');
const ForbiddenErr = require('../utils/errors/ForbiddenErr');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById({ owner: userId })
    .orFail(() => next(new NotFoundErr('Фильмы не найдены')))
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Некорректный формат запроса'));
        return;
      }

      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.body._id;

  Movie.deleteOne({ movieId })
    .orFail(() => next(new NotFoundErr('Фильм не найден')))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenErr('Вы пытаетесь удалить чужой фильм'));
        return;
      }
      res.status(CREATED).send(movie);
    })
    .catch(next);
};
