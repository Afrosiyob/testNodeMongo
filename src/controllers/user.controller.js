const { validationResult } = require( "express-validator" );
const { UserModel } = require( "../models/user.model" );
const bcrypt = require( "bcryptjs" );

const createUser = async ( req, res ) => {
    try {
        const errors = validationResult( req )
        if ( !errors.isEmpty() ) {
            res.status( 400 ).json( {
                errors: errors.array(),
                message: " error "
            } )
        } else {
            const { email, password } = req.body
            const checkEmail = await UserModel.findOne( { email } )
            if ( checkEmail ) {
                res.status( 400 ).json( {
                    message: "please enter other email"
                } )
            } else {
                const hashedPasswword = await bcrypt.hash( password, 12 )
                const newUser = new UserModel( {
                    email,
                    password: hashedPasswword
                } )
                await newUser.save()
                res.status( 200 ).json( { message: "new user created" } )
            }
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: " server error " } );
    }
}
const getUsers = async ( req, res ) => {
    try {

        res.status( 200 ).json( { data: await UserModel.find( { role: "user" } ), message: "all users", } )

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: " server error " } );
    }
}


const getUser = async ( req, res ) => {
    try {
        const { userId } = req.user
        const user = await UserModel.findById( userId )
        res.status( 200 ).json( { data: { email: user.email }, message: "user" } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: " server error " } );
    }
}
const updateUser = async ( req, res ) => {
    try {
        const errors = validationResult( req )
        if ( !errors.isEmpty() ) {
            res.status( 400 ).json( {
                errors: errors.array(),
                message: "errors"
            } )
        } else {
            const { email, passowrd } = req.body
            const { userId } = req.user
            const hashedPasswword = await bcrypt.hash( password, 12 )
            const options = {
                new: true
            }
            const updates = {
                email,
                password: hashedPasswword
            }
            const updateUser = await UserModel.findByIdAndUpdate(
                userId,
                updates,
                options
            )
            res.status( 200 ).json( { data: updateUser, message: "user changed" } )
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: " server error " } );
    }
}
const deleteUser = async ( req, res ) => {
    try {
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: " server error " } );
    }
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}