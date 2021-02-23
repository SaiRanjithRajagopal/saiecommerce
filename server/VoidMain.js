const express = require('express');
const cors = require('cors');
const colors = require('colors');
const donEnvConfig = require('dotenv');

//Console.log(a); -- a is undefined; Javascript error
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down due to Uncaught Exception`.red.bold);
    process.exit(1);
})

//Import MiddleWare
const errorMiddleWare = require('./VersionOne/Middleware/errors')

//Import all files
const ConnecToDB = require('../server/Config/connectDatabase')
const productRoutes = require('../server/VersionOne/Routes/ProductRouter')
const userRoutes = require('../server/VersionOne/Routes/UserRouter')

// Load env variables
donEnvConfig.config({ path: 'server/Config/config.env' })

//Define the Express
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser. This will help to parse the JSON request attached from the client.Also this will help to find the attached parameters from the request
app.use(express.json());
// Enable CORS - This will help to avoid the exception thrown at the browser. Client runs on the different port and server is hosted on different port. Because of the different port, browser will consider that it will is not a safe request. cors will
app.use(cors());

//Connecting to Database
ConnecToDB();

//redirect to routes
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', userRoutes);

app.use(errorMiddleWare);

//Runs the node js using express.js
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.toUpperCase().bold);
});

//Capture Unhandle Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to Unhandle Promise rejection`.red.bold);
    server.close(() => {
        process.exit(1);
    })
});


