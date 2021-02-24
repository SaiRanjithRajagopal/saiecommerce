const User = require('../Models/user');

const errorHandler = require('../../Utils/errorHandler');
const catchAsyncError = require('../Middleware/asyncErrorMiddleware');
const ErrorHandler = require('../../Utils/errorHandler');
const sendToken = require('../../Utils/JWTCookieToken');
const sendEmail = require('../../Utils/sendEmail');
const crypto = require('crypto');

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


exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User successfully logged out'
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    //If user not found return 401 error
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 401));
    }

    //Get reset token
    //TODO notice we are adding any information to the users schema but the inforamtion is saved
    //TODO This is because getResetPasswordToken will reset the password and it is saved on the user schema
    //TODO  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //TODO  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //req.protocol is nothing but http or https
    const resetURL = `${req.protocol}://${req.get(`host`)}/api/${process.env.API_VERSION}/user/resetPassword/${resetToken}`;
    console.log(resetURL);

    const message = `Your password reset token is as follow:\n\n${resetURL}\n\nIf you have not requested this email, then ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message), 500);
    }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    //Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler(`Password reset token is invalid or has been expired`), 400)
    }

    //Macth Pasword
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(`Password does not match`, 400))
    }

    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    //This will attach the Token and add cookie expiry time in the header
    //sendToken(user, 200, res);
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Your Password is successfully updated, Please login with your new password'
    });

});
