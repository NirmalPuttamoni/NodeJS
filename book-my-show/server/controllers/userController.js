const User = require("../models/userModel")
const secret_key = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const body = req.body;
    // console.log(body)
    try {

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.send({ message: `User ${body.name} already exists`, success: false });
        }
        // const newUser = await User.create({
        //     name: body.name,
        //     email: body.email,
        //     password: body.password,
        //     isAdmin: body.isAdmin
        // });
        const newUser = await new User(body).save();
        res.send({ message: `User ${body.name} created`, success: true, data: newUser });
    } catch (error) {
        res.status(500).send({ message: `Internal server error ${error.message}`, success: false })
    }
}

const loginUser = async (req, res) => {
    const body = req.body;
    try {
        const existingUser = await User.findOne({ email: body.email });
        if (!existingUser) {
            return res.status(401).send({ success: false, message: `User ${body.email} does not exist` });
        }
        if (existingUser.email !== body.email) {
            return res.status(401).send({ success: false, message: `User ${body.email} does not exist` });
        }
        if (existingUser.password !== body.password) {
            return res.status(401).send({
                success: false,
                message: "Invalid password!"
            });
        }
        const token = jwt.sign({ userId: existingUser._id }, secret_key, { expiresIn: "10h" });
        // console.log("token ", token)
        res.status(200).json({ success: true, message: `User ${existingUser.name} logged in successfully`, token: token });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` })
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        // console.log("==========", req.url, req.method)
        // console.log("token ", req.headers["authorization"])
        // console.log(req.headers.authorization)
        const user = await User.findById(req?.body?.userId).select("-password");
        res.send({ success: true, message: "You are authenticated", data: user });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: `Internal server error ${error.message}` })
    }
}

module.exports = { createUser, getUsers, loginUser, getCurrentUser };