const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controlleres/movie');
const { validateMovie } = require('../middlewares/validation');

router.get('/', getMovies);

router.post(
  '/',
  validateMovie,
  createMovie,
);

router.delete(
  '/:id',
  deleteMovie,
);

module.exports = router;
