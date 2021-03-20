const User = require('../Models/user');

const errorHandler = require('../../Utils/errorHandler');
const catchAsyncError = require('../Middleware/asyncErrorMiddleware');
const ErrorHandler = require('../../Utils/errorHandler');
const sendToken = require('../../Utils/JWTCookieToken');
const sendEmail = require('../../Utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    let result = undefined;
    if (req.body.avatar) {
        result = await cloudinary.v2.uploader.upload(req.body.avatar);
    }
    else {
        result = {
            public_id: "",
            secure_url: ""
        }
    }
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
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

    //I want to remove the existing token and i want user to login with the new password
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Your Password is successfully updated, Please login with your new password'
    });
});

//Get Currently Logged in users
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
});

//Get Currently Logged in users
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.ComparePassword(req.body.oldpassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    //This will attach the Token and add cookie expiry time in the header
    //sendToken(user, 200, res);

    //I want to remove the existing token and i want user to login with the new password
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Your Password is successfully updated, Please login with your new password'
    });
});

//Get Currently Logged in users
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    let result = undefined;
    const getUser = await User.findById(req.user.id);

    //If user not found return 401 error
    if (!getUser) {
        return next(new ErrorHandler('User not found with this email', 401));
    } else {
        result = {
            public_id: getUser.avatar.public_id,
            secure_url: getUser.avatar.url
        }
    }

    if (req.body.avatar) {
        result = await cloudinary.v2.uploader.upload(req.body.avatar);
    }

    const updateUserData = {
        name: req.body.name,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }

    };

    //Update Avatar: TODO
    //TODO Ranjith Need to understand update options in mongodb  new: true,runValidators: true,useFindAndModify: false
    const user = await User.findByIdAndUpdate(req.user.id, updateUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        "success": true,
        user
    });
});

//Admin Routes
//Get all the users
exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        "success": true,
        users
    });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
});

//Get Currently Logged in users
exports.updateUserProfile_Roles_ByAdmin = catchAsyncError(async (req, res, next) => {
    console.log('sai');
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role || 'user'
    };

    //TODO Ranjith Need to understand update options in mongodb  new: true,runValidators: true,useFindAndModify: false
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        "success": true
    });
});

//Delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    //Remove avatar from cloudinary server

    await user.remove();
    res.status(200).json({
        success: true,
        message: "User successfully deleted"
    })
});
