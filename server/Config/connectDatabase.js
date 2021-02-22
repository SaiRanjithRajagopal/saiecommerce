const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(connectionResult => {
        console.log(`MongoDB Database Connected with Host: ${connectionResult.connection.host}`.green.bold);
    })
};

module.exports = connectDatabase;