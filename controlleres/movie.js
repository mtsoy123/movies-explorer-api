const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById({ owner: userId })
    .then((res) => res.send('qwe'))
    .then((movies) => res.send(movies))
    .catch(next);
};
