const { BookModel } = require("../models/book.model")

const createBook = async(req, res) => {
    try {
        const { name } = req.body
        const checkName = await BookModel.findOne({ name })
        if (checkName) {
            res.status(400).json({ message: "enter other name" })
        } else {
            const newBook = new BookModel({
                name,
                owner: req.user.userId
            })
            await newBook.save()
            res.status(200).json({ message: "new book created", data: newBook })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

const getBooks = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

const getBook = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

const updateBook = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

const deleteBook = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}