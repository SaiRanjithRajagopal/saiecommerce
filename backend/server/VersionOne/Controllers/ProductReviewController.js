const mongoose = require('mongoose');
const Order = require('../Models/order');
const Product = require('../Models/products');
const ErrorHandler = require('../../Utils/errorHandler');
const catchAsyncHandler = require('../Middleware/asyncErrorMiddleware');
const order = require('../Models/order');
const { param } = require('../Routes/UserRouter');

exports.createProductReview = catchAsyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        ratings: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.ratings = Number(rating);
                review.numofReviews = product.reviews.length;
            }
        });
    }
    else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc, item) => item.ratings + acc, 0) / product.reviews.length
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        "message": "Review added successfully"
    })
});

exports.getProductReviews = catchAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.Id);
    console.log(product);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

exports.deleteReview = catchAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const ratings = reviews.reduce((acc, item) => item.ratings + acc, 0) / reviews.length || 0
    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});