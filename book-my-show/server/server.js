const express = require("express");
const mongoose = require("mongoose")

const app = express();

require("dotenv").config(); // load env variables into process.env

/**
 * to read from env file, we use a package called dotenv
 * what it does is, it reads the .env file and populates the process.env object
 */

dbURL = process.env.dbURL;

mongoose.connect(dbURL)
    .then(function () {
        console.log("connected to DB")
    })

// const connectDB = require("./config/db");
/**
 * diff between import and require
 * import is ES6 syntax
 * require is commonJS syntax
 * require can be conditional. import cannot be conditional
 * import happens at the beginning of the file
 * require can be used anywhere in the file
 * require can be conditonally loaded
 */

// connectDB();

app.get("/api/products", (req, res) => {
    return res.send("Response from api");
})


const port = 8000;
app.listen(port, () => {
    console.log("Server started at port :", port);
})