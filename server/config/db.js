const mongoose = require('mongoose');

const connectDB = async () => {
    return mongoose.connect("mongodb://localhost/contact_manager")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error)
    });
};

module.exports = connectDB;


