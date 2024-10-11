const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

userRouter.get("/", getUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", createUser);
userRouter.get("/get-current-user", auth, getCurrentUser);
userRouter.patch("/forgot-password", forgotPassword);
userRouter.patch("/reset-password/:email", resetPassword);

module.exports = userRouter;
