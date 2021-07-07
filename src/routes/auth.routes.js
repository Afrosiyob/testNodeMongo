const { Router } = require("express");
const {
    authLogin,
    authLogout,
    authMe,
} = require("../controllers/auth.controller");
const { createUser } = require("../controllers/user.controller");
const {
    validationError,
    checkAuth,
    setPermission,
} = require("../middlewares/middlewares");
const {
    authLoginValidation,
    userCreateValidation,
} = require("../validations/validations");

const router = Router();

router.post("/login", authLoginValidation, validationError, authLogin);
router.post("/logout", authLogout);
router.post("/registration", userCreateValidation, validationError, createUser);
router.get("/me", checkAuth, setPermission("admin"), authMe);

module.exports = {
    authRouter: router,
};