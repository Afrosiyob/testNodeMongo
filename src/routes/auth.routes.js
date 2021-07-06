const { Router } = require("express")
const { authLogin, authLogout, authRegistration } = require("../controllers/auth.controller")
const { createUser } = require("../controllers/user.controller")
const { validationError } = require("../middlewares/middlewares")
const { authLoginValidation, userCreateValidation } = require("../validations/validations")


const router = Router()

router.post("/login", authLoginValidation, validationError, authLogin)
router.post("/logout", authLogout)
router.post("/registration", userCreateValidation, validationError, createUser)

module.exports = {
    authRouter: router
}