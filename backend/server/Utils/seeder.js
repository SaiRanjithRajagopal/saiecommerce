const Product = require('../VersionOne/Models/products');
const dotenv = require('dotenv');
const connectDatabase = require('../Config/connectDatabase');

const products = require('../data/productsCollections');
const { connect } = require('mongoose');

dotenv.config({ path: 'server/Config/config.env' });

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products);
        console.log('Products added successfully');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();

