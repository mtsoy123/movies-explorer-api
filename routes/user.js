const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controlleres/user');

router.get('/me', getUserInfo);

router.patch('/users', updateUserInfo);

module.exports = router;
