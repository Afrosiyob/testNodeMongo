const express = require("express");
const config = require("config");
const morgan = require("morgan");
require("express-async-errors");

// const winston = require("winston");

const { connectMongoDB } = require("./services/db/mongoDB");
const { userRouter } = require("./src/routes/user.routes");
const { authRouter } = require("./src/routes/auth.routes");
const { bookRouter } = require("./src/routes/book.routes");
const { prodUseApp } = require("./prod");

// Create app server
const app = express();

prodUseApp(app);

// Get port
const PORT = config.get("PORT") || 5000;
// Set json data
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
}

// winston.add(winston.transports.File, { filename: "koko.log" });

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);

// Last error middleware
app.use((err, req, res, next) => {
    // winston.log("error");
    res.status(500).status({ message: "server error" });
});

// Start app server
app.listen(PORT, connectMongoDB);