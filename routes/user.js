const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { getUserInfo, updateUserInfo } = require('../controlleres/user');

router.get('/me', getUserInfo);

router.patch(
  '/users',
  celebrate({
    body: {
      body: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
      }),
    },
  }),
  updateUserInfo,
);

module.exports = router;
