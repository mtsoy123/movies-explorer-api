const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('../middlewares/isAuthorised');
const { signup, signin } = require('../controlleres/user');
const NotFoundErr = require('../utils/errors/NotFoundErr');

router.post('/signup', signup);
router.post('/signin', signin);

router.use(auth);
router.use('/user', userRouter);
router.use('/movie', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

module.exports = router;
