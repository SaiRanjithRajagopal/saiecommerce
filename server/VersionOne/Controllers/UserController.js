const User = require('../Models/user');

const errorHandler = require('../../Utils/errorHandler');
const catchAsyncError = require('../Middleware/asyncErrorMiddleware');
const ErrorHandler = require('../../Utils/errorHandler');
const sendToken = require('../../Utils/JWTCookieToken');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png'
        }
    });
    sendToken(user, 200, res);
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email or password', 400));
    }

    //Finding user in database
    //We are eliminating the password in the selection
    const user = await User.findOne({ email }).select('+password');

    //If user not found return 401 error
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Check if password is correct or not
    const isPasswordMatched = await user.ComparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();

    sendToken(user, 200, res);
});
