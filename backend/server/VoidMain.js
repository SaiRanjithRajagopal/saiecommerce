const express = require('express');
const cors = require('cors');
const colors = require('colors');
const donEnvConfig = require('dotenv');
const cookieParser = require('cookie-parser');

//Console.log(a); -- a is undefined; Javascript error
//This will capture all the javascript exceptions in the application
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down due to Uncaught Exception`.red.bold);
    process.exit(1);
})


// Load env variables
donEnvConfig.config({ path: 'server/Config/config.env' })
const PORT = process.env.PORT || 5000;


//Import MiddleWare
const errorMiddleWare = require('./VersionOne/Middleware/errors')


//Activate the Database Connection
const ConnecToDB = require('./Config/connectDatabase')
ConnecToDB();//Connecting to Database


//Router Endpoints
const productRoutes = require('./VersionOne/Routes/ProductRouter')
const userRoutes = require('./VersionOne/Routes/UserRouter')
const orderRoutes = require('./VersionOne/Routes/OrderRouter')
const prodcutReviewsRoutes = require('./VersionOne/Routes/ProductReviewsRouter')


//Define the Express
const app = express();


// Body parser. This will help to parse the JSON request attached from the client.Also this will help to find the attached parameters from the request
app.use(express.json());
// Enable CORS - This will help to avoid the exception thrown at the browser. Client runs on the different port and server is hosted on different port. Because of the different port, browser will consider that it will is not a safe request. cors will
app.use(cors());
//Cookie parser will help you to save the tokens in the cookies
app.use(cookieParser());


//redirect to routes - endpoints
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', orderRoutes);
app.use('/api/v1/', prodcutReviewsRoutes);


//configure the middlewares
app.use(errorMiddleWare);


//Runs the node js using express.js
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.toUpperCase().bold);
});



//Capture Unhandle Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`STACK: ${err.stack}`);
    console.log(`Shutting down the server due to Unhandle Promise rejection`.red.bold);
    server.close(() => {
        process.exit(1);
    });
});

//********************End of Sairam Application**********************//

