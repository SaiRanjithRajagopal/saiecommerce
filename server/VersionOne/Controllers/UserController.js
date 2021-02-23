const User = require('../Models/user');

const errorHandler = require('../../Utils/errorHandler');
const catchAsyncError = require('../Middleware/asyncErrorMiddleware');

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

    const token = user.getJwtToken();

    res.status(201).json({ "success": true, token })
});

