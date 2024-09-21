const express = require("express");
const userRouter = express.Router();
const { createUser, getUsers, loginUser } = require("../controllers/userController")

// userRouter.get("/api/products", )
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser)
userRouter.get("/", getUsers);

module.exports = userRouter;