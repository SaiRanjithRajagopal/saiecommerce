const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const ConnectMongoDB = require('./Config/ConnectDatabase')

// Load env variables
dotenv.config({ path: './VersionOne/Config/config.env' });


//Runs the node js using express.js
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.toUpperCase().bold);
});

