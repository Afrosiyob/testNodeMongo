const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const path = require("path");
const multer = require("multer");

const setPermission = (permissions) => async(req, res, next) => {
    const { userId } = req.user;
    const { role } = await UserModel.findById(userId);
    if (permissions.includes(role)) {
        next();
    } else {
        return res
            .status(401)
            .json({ message: "u dont have permission this route" });
    }
};

const checkAuth = async(req, res, next) => {
    if (req.method === "OPTIONS") {
        await next();
    } else {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
            }
            if (!token) {
                await res.status(401).json({ message: "auth error" });
            } else {
                let decoded = jwt.verify(token, config.get("jwtSecret"));
                req.user = decoded;
                res.setHeader("Last-Modified", new Date().toUTCString());
                await next();
            }
        } catch (error) {
            console.log(error);
            return await res.status(401).json({ message: "auth error" });
        }
    }
};

const validationError = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: "please check failds",
        });
    } else {
        next();
    }
};

// Set
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/images`);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

//Init Upload
const upload = multer({
    storage: storage,
}).single("image");

const getBooks = async(req, res, next) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    const { role } = user;
    if (role === "admin") {
        req.courses = await CourseModal.find();
    } else {
        req.courses = await CourseModal.find({ owner: userId });
    }
    next();
};

module.exports = {
    validationError,
    setPermission,
    checkAuth,
    upload,
    getBooks,
};