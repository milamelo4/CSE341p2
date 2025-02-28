const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateUser = require('../utils/authMiddleware');
const { 
    bookValidationRules, 
    validateBook, 
    validateBookId 
} = require('../utils/bookValidation');


// Get all books (public)
router.get('/', bookController.getAllBooks);

// Get a book by ID (public)
router.get('/:id', bookController.getBookById);

// Create a new book (protected)
router.post(
  "/",
  authenticateUser,
  ...bookValidationRules(), // Spread the array so each function is passed separately
  validateBook,
  bookController.createBook
);

// Update a book by ID (protected)
router.put(
  "/:id",
  authenticateUser,
  validateBookId(),
  ...bookValidationRules(),
  validateBook,
  bookController.updateBook
);

// Delete a book by ID (protected)
router.delete(
  "/:id",
  authenticateUser,
  validateBookId(),
  bookController.deleteBook
);

module.exports = router;