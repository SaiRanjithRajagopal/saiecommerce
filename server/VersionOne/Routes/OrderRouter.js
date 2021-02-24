const express = require('express');
const router = express.Router();

const { newOrder } = require('../Controllers/OrdersController');
const { isAuthenticatedUser, authorizedRoles } = require('../Middleware/AuthenticationMiddleWare');

router.route('/order/createorder').post(isAuthenticatedUser, newOrder);

module.exports = router;


