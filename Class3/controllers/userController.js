const UserModel = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Internal Server error", error);
    }
}

const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        console.log("user email", email);
        if (!user) {
            const newUser = await new UserModel(req.body).save();

            return res.status(201).json(`User ${name} created successfully`);
        }
        res.status(404).json(`User ${name} already exists`);
    } catch (error) {
        res.status(500).json({ message: `Internal Server error ${error}` });
    }
}

module.exports = { getUsers, createUser };