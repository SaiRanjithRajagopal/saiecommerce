const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../Controllers/ProductController')
const { isAuthenticatedUser, authorizedRoles } = require('../Middleware/AuthenticationMiddleWare')

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/product/:Id').get(getSingleProduct);
router.route('/admin/products/createNewProduct').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/admin/product/:Id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

module.exports = router;