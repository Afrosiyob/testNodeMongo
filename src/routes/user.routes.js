const { Router } = require( "express" )
const { createUser, getUsers, getUser, updateUser, deleteUser } = require( "../controllers/user.controller" )
const { userCreateValidation, userUpdateValidation } = require( "../validations/validations" )

const router = Router()

router.post( "/create", userCreateValidation, createUser )
router.get( "/", getUsers )
router.get( "/:userId", getUser )
router.put( "/:userId", userUpdateValidation, updateUser )
router.delete( "/:userId", deleteUser )

module.exports = {
    userRouter: router
}