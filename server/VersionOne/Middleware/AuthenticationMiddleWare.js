const jwt = require('jsonwebtoken');

const user = require('../Models/user');
const ErrorHandler = require('../../Utils/errorHandler');
const asyncErrorHandler = require('../Middleware/asyncErrorMiddleware');


exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler('Please login to access the resources', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();
});

