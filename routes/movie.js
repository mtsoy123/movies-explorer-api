const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controlleres/movie');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovies);

router.post(
  '/',
  validateCreateMovie,
  createMovie,
);

router.delete(
  '/:id',
  validateDeleteMovie,
  deleteMovie,
);

module.exports = router;
