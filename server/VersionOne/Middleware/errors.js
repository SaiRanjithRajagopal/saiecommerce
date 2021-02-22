const ErrorHandler = require('../../Utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        return res.status(err.statusCode).json({
            success: false,
            errMessage: err.message,
            stack: err.stack
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {

        let error = { ...err };
        error.message = err.message || 'Internal Server Error';
        return res.status(err.statusCode).json({
            success: false,
            error: error.message
        });
    }
}