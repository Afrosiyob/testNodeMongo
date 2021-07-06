const mongoose = require("mongoose")

const { Schema, model, Types } = mongoose
const { ObjectId } = Types

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    book: [{
        type: ObjectId,
        ref: "Book"
    }]
})

module.exports = {
    UserModel: model("User", schema)
}