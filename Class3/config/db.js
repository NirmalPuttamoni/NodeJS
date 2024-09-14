const mongoose = require("mongoose")
// import mongoose from "mongoose"

dbURL = "mongodb+srv://wamore1224:yor5bBC90a7c5Yzo@cluster0.ph8yayw.mongodb.net/node_test"

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error while connecting to DB", err);
    }
}

module.exports = connectDB;