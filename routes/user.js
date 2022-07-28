const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controlleres/user');
const { validateUserPatch } = require('../middlewares/validation');

router.get('/me', getUserInfo);

router.patch(
  '/me',
  validateUserPatch,
  updateUserInfo,
);

module.exports = router;
