const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../Controllers/UserController')

router.route('/user/register').post(registerUser);
router.route('/user/login').get(loginUser);

module.exports = router;