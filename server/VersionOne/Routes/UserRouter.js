const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout } = require('../Controllers/UserController')

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logout);

module.exports = router;