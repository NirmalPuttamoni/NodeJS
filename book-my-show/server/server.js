const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const port = process.env.port;
const app = express();
app.use(express.json())
// require("dotenv").config(); // load env variables into process.env

/**
 * to read from env file, we use a package called dotenv
 * what it does is, it reads the .env file and populates the process.env object
 */

connectDB();

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

app.use("/api/users/", userRouter);

app.listen(port, () => {
    console.log("Server started at port :", port);
})