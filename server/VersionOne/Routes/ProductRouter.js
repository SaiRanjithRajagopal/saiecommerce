const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../Controllers/ProductController')

router.route('/products').get(getProducts);
router.route('/product/:Id').get(getSingleProduct);
router.route('/admin/products/createNewProduct').post(newProduct);
router.route('/admin/product/:Id').put(updateProduct).delete(deleteProduct);

module.exports = router;