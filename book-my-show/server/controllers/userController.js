const User = require("../models/userModel")

const createUser = async (req, res) => {
    const body = req.body;
    console.log(body)
    try {

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(404).json({ message: `User ${body.name} already exists` });
        }
        // const newUser = await User.create({
        //     name: body.name,
        //     email: body.email,
        //     password: body.password,
        //     isAdmin: body.isAdmin
        // });
        const newUser = await new User(body).save();
        res.status(200).json({ message: `User ${body.name} created` });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` })
    }
}

const loginUser = async (req, res) => {
    const body = req.body;
    try {
        const existingUser = await User.findOne({ email: body.email });
        if (!existingUser) {
            return res.status(404).send({ message: `User ${body.email} doesnot exist` });
        }
        res.status(200).json({ message: `User ${existingUser.name} logged in successfully` });
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

module.exports = { createUser, getUsers, loginUser };