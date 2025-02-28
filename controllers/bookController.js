const Book = require('../models/bookSchema');
const mongoose = require('mongoose');

const getAllBooks = async (req, res, next) => {   
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}

// get a book by id
const getBookById = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return next({status: 400, message: "Invalid book ID"});
    }
    const book = await Book.findById(id);
    if(!book){
      return next({status: 404, message: "Book not found"});
    }
    res.status(200).json(book);
    } catch (error) {
      next(error);
  }
}

// Create a new book
const createBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

// Update a book by ID
const updateBook = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid book ID format" });
  }
  try {
    // Find the existing book
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return next({ status: 404, message: "Book not found" });
    }

    // Check if ISBN is being updated and ensure it's unique
    if (req.body.ISBN && req.body.ISBN !== existingBook.ISBN) {
      const isbnExists = await Book.findOne({ ISBN: req.body.ISBN });
      if (isbnExists) {
        return next({
          status: 400,
          message: "ISBN already exists. Please use a unique ISBN.",
        });
      }
    }

    // Update the book
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Delete a book by ID
const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid book ID format" });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return next({ status: 404, message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}