const { check } = require("express-validator");

const userCreateValidation = [
    check("email", "enter email").isEmail(),
    check("password", "enter more than 6 character").isLength({ min: 6 })
]

const userUpdateValidation = [
    check("email", "enter email").isEmail(),
    check("password", "enter more than 6 character").isLength({ min: 6 })
]

const authLoginValidation = [
    check("email", "enter email").isEmail(),
    check("password", "enter password").exists()
]

const bookCraeteValidation = [
    check("name", "enter name").exists()
]



module.exports = {
    userCreateValidation,
    userUpdateValidation,
    authLoginValidation,
    bookCraeteValidation
}