const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../Controllers/ProductController')
const { isAuthenticatedUser } = require('../Middleware/AuthenticationMiddleWare')

router.route('/products').get(getProducts);
router.route('/product/:Id').get(getSingleProduct);
router.route('/admin/products/createNewProduct').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:Id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);

module.exports = router;