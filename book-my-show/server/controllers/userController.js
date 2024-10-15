const User = require("../models/userModel");
const secret_key = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/emailHelper");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const body = req.body;
  // console.log(body);
  try {
    if (body.password !== body.confirm_password) {
      return res.send({
        message: "Password and Confirm Password did not match",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.send({
        message: `User ${body.name} already exists`,
        success: false,
      });
    }
    // const newUser = await User.create({
    //     name: body.name,
    //     email: body.email,
    //     password: body.password,
    //     isAdmin: body.isAdmin
    // });

    //hash the password
    const saltRounds = 10; // higher the number , the more secure but slower the hashing process
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const newUser = await new User({
      ...body,
      password: hashedPassword,
    }).save();
    res.send({
      message: `User ${body.name} created`,
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({
      message: `Internal server error ${error.message}`,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  try {
    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) {
      return res
        .status(401)
        .send({ success: false, message: `User ${body.email} does not exist` });
    }
    if (existingUser.email !== body.email) {
      return res
        .status(401)
        .send({ success: false, message: `User ${body.email} does not exist` });
    }
    // if (existingUser.password !== body.password) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Invalid password!",
    //   });
    // }
    const isMatch = await bcrypt.compare(body.password, existingUser.password);
    const token = jwt.sign({ userId: existingUser._id }, secret_key, {
      expiresIn: "10h",
    });
    // console.log("token ", token)
    if (isMatch) {
      res.status(200).json({
        success: true,
        message: `User ${existingUser.name} logged in successfully`,
        token: token,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid password!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // console.log("==========", req.url, req.method)
    // console.log("token ", req.headers["authorization"])
    // console.log(req.headers.authorization)
    const user = await User.findById(req?.body?.userId).select("-password");
    if (user) {
      res.send({ success: true, message: "You are authenticated", data: user });
    } else {
      res.send({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

/**
 * @returns otp 100000 -> 999999
 */

const otpGenerator = () => {
  return Math.floor(Math.random() * 900000 + 100000); // 100000 -> 999999
};

const forgotPassword = async (req, res) => {
  /**
   * 1. you can check for email
   * 2. check if the email is present or not
   * 3. if email is not present -> send a response -> user not found
   * 4. if email is present -> generate a random otp -> send to the email
   * 5. save the otp in the database
   */
  try {
    if (!req?.body?.email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    // send the otp to user
    await EmailHelper("otp.html", user.email, { name: user.name, otp: otp });
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

const resetPassword = async (req, res) => {
  // otp
  // new password
  // email -> params
  try {
    const resetDetails = req.body;
    if (!resetDetails.otp || !resetDetails.password) {
      return res
        .status(400)
        .send({ message: "OTP and Password is required", success: false });
    }
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }
    if (user.otp !== resetDetails.otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset succussful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
};

module.exports = {
  createUser,
  getUsers,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
