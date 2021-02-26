const jwt = require('jsonwebtoken');

const user = require('../Models/user');
const ErrorHandler = require('../../Utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorMiddleware');


exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler('Please login to access the resources', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();
});

//Hanlding User Roles
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            //TODO Ranji How does the return next middle ware is working ? Find it out
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}