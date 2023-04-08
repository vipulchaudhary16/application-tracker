const mongoose = require('mongoose');
require('dotenv').config();

// const connectionStr = 'mongodb://0.0.0.0:27017/awt';
const connectionStr = process.env.MONGO_URI;
const connectToMongo = () => {
    mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
}

module.exports = { connectToMongo };