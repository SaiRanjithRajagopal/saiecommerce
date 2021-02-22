const express = require('express');
const router = express.Router();


const { getProducts, newProduct } = require('../Controllers/ProductController')

router.route('/products').get(getProducts);
router.route('/products/createNewProduct').post(newProduct);

module.exports = router;