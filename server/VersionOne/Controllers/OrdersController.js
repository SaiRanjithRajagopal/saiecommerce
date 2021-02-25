const mongoose = require('mongoose');
const Order = require('../Models/order');
const Product = require('../Models/products');
const ErrorHandler = require('../../Utils/errorHandler');
const catchAsyncHandler = require('../Middleware/asyncErrorMiddleware');
const order = require('../Models/order');

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

//Get Single Order
//TODO BUG the user info is not populated
exports.getSingleOrder = catchAsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('User', 'name email');

    if (!order) {
        return next(new ErrorHandler('No order found with this Id', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});


//Get Logged in orders
exports.getLoggedin_usersorders = catchAsyncHandler(async (req, res, next) => {
    //TODO Ranjith Why  we are using user: req.user.id  why not user: req.user.id
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
});


//Getall orders
exports.getallorders = catchAsyncHandler(async (req, res, next) => {
    //TODO Ranjith Why  we are using user: req.user.id  why not user: req.user.id
    const orders = await Order.find();
    let totalamount = 0;

    orders.forEach(order => {
        totalamount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalamount,
        orders
    });
});


//Update Order Stock after purchased
exports.updateOrder = catchAsyncHandler(async (req, res, next) => {
    //TODO Ranjith Why  we are using user: req.user.id  why not user: req.user.id
    const orders = await Order.findById(req.params.id);
    if (orders.orderStatus === 'Delivered') {
        return next(new ErrorHandler(`You have already delivered this order, so we can't update the order`, 400));
    }

    orders.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    orders.orderStatus = req.body.status;
    orders.deliveredAt = Date.now();

    await orders.save();

    res.status(200).json({
        success: true,
        orders
    });
});

const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);
    //TODO Ranjith what happens if the quantity is negative?
    product.stock = product.stock - quantity || 0;
    //await product.save();
    await product.save({ validateBeforeSave: false });
}


//Delete order

//Getall orders
exports.deleteOrder = catchAsyncHandler(async (req, res, next) => {
    //TODO Ranjith Why  we are using user: req.user.id  why not user: req.user.id
    const orders = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this Id', 404));
    }

    orders.remove();

    res.status(200).json({
        success: true,
        message: `order deleted successfully`
    });
});