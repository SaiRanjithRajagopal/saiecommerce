const express = require('express');
const router = express.Router();

const { createProductReview, getProductReviews, deleteReview } = require('../Controllers/ProductReviewController')
const { isAuthenticatedUser, authorizedRoles } = require('../Middleware/AuthenticationMiddleWare')

router.route('/reviews/create').put(isAuthenticatedUser, createProductReview);
router.route('/reviews/getallreviews/:Id').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews/delete').delete(isAuthenticatedUser, deleteReview);

module.exports = router;