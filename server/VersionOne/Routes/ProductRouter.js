const express = require('express');
const router = express.Router();


const { getProducts, newProduct, getSingleProduct } = require('../Controllers/ProductController')

router.route('/products').get(getProducts);
router.route('/product/:Id').get(getSingleProduct);
router.route('/products/createNewProduct').post(newProduct);

module.exports = router;