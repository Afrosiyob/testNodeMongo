const express = require("express");
const config = require("config");
const morgan = require("morgan");
const { connectMongoDB } = require("./services/db/mongoDB");
const { userRouter } = require("./src/routes/user.routes");
const { authRouter } = require("./src/routes/auth.routes");
const { bookRouter } = require("./src/routes/book.routes");

// Create app server
const app = express();
// Get port
const PORT = config.get("PORT") || 5000;
// Set json data
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
}

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);

// Start app server
app.listen(PORT, connectMongoDB);