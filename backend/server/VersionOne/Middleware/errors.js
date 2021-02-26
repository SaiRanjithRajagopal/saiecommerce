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

        //Wrong Mongoose Object Id Error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        //Handling duplicate Value in monogoDB
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        //Handling Wrong JWT Error
        if (err.name === 'JsonwebTokenError') {
            const message = `JSON Web Token is invalid. Please Try Again !`;
            error = new ErrorHandler(message, 400);
        }

        //Handling JWT Expired
        if (err.name === 'TokenExpiresError') {
            const message = `JSON Web Token is expires. Please Try Again !`;
            error = new ErrorHandler(message, 400);
        }

        return res.status(err.statusCode).json({
            success: false,
            error: error.message
        });
    }
}