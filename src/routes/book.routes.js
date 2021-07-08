const { Router } = require("express");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const { checkAuth, validationError } = require("../middlewares/middlewares");
const { bookCraeteValidation } = require("../validations/validations");

const router = Router();

router.post(
  "/create",
  checkAuth,
  bookCraeteValidation,
  validationError,
  createBook
);
router.get("/", checkAuth, getBooks);
router.get("/:bookId", checkAuth, getBook);
router.put("/:bookId", checkAuth, updateBook);
router.delete("/:bookId", checkAuth, deleteBook);

module.exports = {
  bookRouter: router,
};
