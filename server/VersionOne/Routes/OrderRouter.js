const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, getLoggedin_usersorders, getallorders, updateOrder, deleteOrder } = require('../Controllers/OrdersController');
const { isAuthenticatedUser, authorizedRoles } = require('../Middleware/AuthenticationMiddleWare');

router.route('/order/createorder').post(isAuthenticatedUser, newOrder);
router.route('/order/getorderbyid/:id').get(isAuthenticatedUser, getSingleOrder, getallorders);
router.route('/order/me').get(isAuthenticatedUser, getLoggedin_usersorders);
router.route('/order/getallorders').get(isAuthenticatedUser, authorizedRoles('admin'), getallorders);
router.route('/order/updateorder/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder);
router.route('/order/deleteorder/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;


