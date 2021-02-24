const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateUserProfile, allUsers } = require('../Controllers/UserController')
const { isAuthenticatedUser, authorizedRoles } = require('../Middleware/AuthenticationMiddleWare')

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logout);
router.route('/user/forgotpassword').post(forgotPassword);
router.route('/user/resetPassword/:token').put(resetPassword);
router.route('/user/userprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/user/updatepassword').put(isAuthenticatedUser, updatePassword);
router.route('/user/updateprofile').put(isAuthenticatedUser, updateUserProfile);
router.route('/user/admin/getallusers').get(isAuthenticatedUser, authorizedRoles('admin'), allUsers);

module.exports = router;