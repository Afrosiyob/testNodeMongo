const { check } = require( "express-validator" );

const userCreateValidation = [
    check( "email", "enter email" ).isEmail(),
    check( "password", "enter more than 6 character" ).isLength( { min: 6 } )
]

const userUpdateValidation = [
    check( "email", "enter email" ).isEmail(),
    check( "password", "enter more than 6 character" ).isLength( { min: 6 } )
]

module.exports = {
    userCreateValidation,
    userUpdateValidation
}