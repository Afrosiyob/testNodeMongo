const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const createUser = async(req, res) => {
    const { email, password } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
        res.status(400).json({
            message: "please enter other email",
        });
    } else {
        const hashedPasswword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            email,
            password: hashedPasswword,
        });
        await newUser.save();
        res.status(200).json({ message: "new user created" });
    }
};

const getUsers = async(req, res) => {
    res.status(200).json({
        data: await UserModel.find({ role: "user" }),
        message: "all users",
    });
};

const getUser = async(req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    res
        .status(200)
        .json({ data: _.pick(user, ["_id", "email"]), message: "user" });
};
const updateUser = async(req, res) => {
    const { email, password } = req.body;
    const { userId } = req.user;
    const hashedPasswword = await bcrypt.hash(password, 12);
    const options = {
        new: true,
    };
    const updates = {
        email,
        password: hashedPasswword,
    };
    const updateUser = await UserModel.findByIdAndUpdate(
        userId,
        updates,
        options
    );
    res.status(200).json({ data: updateUser, message: "user changed" });
};
const deleteUser = async(req, res) => {};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};