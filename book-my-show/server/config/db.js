const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to DB ", error)
    }
};

module.exports = connectDB;