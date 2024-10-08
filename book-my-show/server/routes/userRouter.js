const express = require("express");
const userRouter = express.Router();
const { createUser, getUsers, loginUser, getCurrentUser } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser)
userRouter.get("/get-current-user", auth, getCurrentUser)
userRouter.get("/", getUsers);

module.exports = userRouter;