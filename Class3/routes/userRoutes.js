const express = require("express");
const userRoute = express.Router();
const {createUser, getUsers} =  require("../controllers/userController");

userRoute.get("/", getUsers);

userRoute.post("/", createUser);

module.exports = userRoute;