const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const authLogin = async(req, res) => {
    const { email, password } = req.body;
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
        res.status(400).json({ message: "this email invalid" });
    } else {
        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            res.status(400).json({ message: "password incorrect" });
        } else {
            const token = jwt.sign({ userId: checkUser.id },
                config.get("jwtSecret"), { expiresIn: "1d" }
            );
            res.status(200).json({
                token,
                email: checkUser.email,
                role: checkUser.role,
            });
        }
    }
};
const authLogout = async(req, res) => {};

const authMe = async(req, res) => {
    const checkUser = await UserModel.findById(req.user.userId);
    if (!checkUser) {
        res.status(401).json({ message: "auth yuqku brat" });
    } else {
        res.json({
            data: checkUser,
            message: "hush kelibsiz",
        });
    }
};

module.exports = {
    authLogin,
    authLogout,
    authMe,
};