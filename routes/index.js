const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const isAuthorised = require('../middlewares/isAuthorised');
const { signup, login, signout } = require('../controlleres/user');
const NotFoundErr = require('../utils/errors/NotFoundErr');
const { validateUserAuth, validateUserSignin } = require('../middlewares/validation');

router.post('/signup', validateUserAuth, signup);
router.post('/signin', validateUserSignin, login);

router.use(isAuthorised);

router.get('/signout', signout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

module.exports = router;
