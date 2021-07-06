const { Router } = require("express")
const { createUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller")
const { setPermission, checkAuth, validationError } = require("../middlewares/middlewares")
const { userCreateValidation, userUpdateValidation } = require("../validations/validations")

const router = Router()

router.post("/create", userCreateValidation, validationError, createUser)
router.get("/", checkAuth, setPermission("admin"), getUsers)
router.get("/:userId", getUser)
router.put("/:userId", checkAuth, userUpdateValidation, validationError, updateUser)
router.delete("/:userId", deleteUser)

module.exports = {
    userRouter: router
}