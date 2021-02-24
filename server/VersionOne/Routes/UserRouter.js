const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../Controllers/UserController')

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logout);
router.route('/user/forgotpassword').post(forgotPassword);
router.route('/user/resetPassword/:token').put(resetPassword);

module.exports = router;