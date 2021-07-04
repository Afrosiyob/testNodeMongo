const express = require( "express" )
const config = require( "config" )
const { connectMongoDB } = require( "./services/db/mongoDB" )
const { userRouter } = require( "./src/routes/user.routes" )


// Create app server
const app = express()
// Get port
const PORT = config.get( "PORT" ) || 5000
// Set json data
app.use( express.json( { extended: true } ) );
app.use( express.urlencoded( { extended: false } ) );


// Routes
app.use( "/api/user", userRouter )

// Start app server
app.listen( PORT, connectMongoDB )


