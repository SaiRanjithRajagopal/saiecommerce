const Order = require('../Models/order');
const Product = require('../Models/products');
const ErrorHandler = require('../../Utils/errorHandler');
const catchAsyncHandler = require('../Middleware/asyncErrorMiddleware');

exports.newOrder = catchAsyncHandler(async (req, res, next) => {

    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});