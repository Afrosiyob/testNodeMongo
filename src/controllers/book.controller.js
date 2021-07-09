const { BookModel } = require("../models/book.model");

const createBook = async(req, res) => {
    const { name } = req.body;
    const checkName = await BookModel.findOne({ name });
    if (checkName) {
        res.status(400).json({ message: "enter other name" });
    } else {
        const newBook = new BookModel({
            name,
            owner: req.user.userId,
        });
        await newBook.save();
        res.status(200).json({ message: "new book created", data: newBook });
    }
};

const getBooks = async(req, res) => {
    const { pageNumber, pageSize } = req.query;
    //  /api/books?pagenumber=3&pageSize=10
    const books = await BookModel.find({ owner: req.user.userId })
        .select("name owner")
        .populate("owner", "email -_id")
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));

    if (!books) {
        res.status(400).json({ message: "nothing" });
    } else {
        res.status(200).json({ message: "all books", data: books });
    }
};

const getBook = async(req, res) => {};

const updateBook = async(req, res) => {};

const deleteBook = async(req, res) => {};

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};