const express = require('express');
const router = express.Router();

const { registerUser } = require('../Controllers/UserController')

router.route('/user/register').get(registerUser);

module.exports = router;