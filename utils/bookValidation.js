const { body, param, validationResult } = require("express-validator");

// Validation rules for creating/updating a book
const bookValidationRules = () => [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("genre").trim().notEmpty().withMessage("Genre is required"),
  body("publishedYear")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid number"),
  body("ISBN").trim().notEmpty().withMessage("ISBN is required"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("summary").optional().trim(),
];

// Validation for book ID (to ensure it's a valid MongoDB ObjectId)
const validateBookId = () => [
  param("id").isMongoId().withMessage("Invalid book ID format"),
];

// Middleware to check validation results
const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: "Validation failed",
      errors: errors
        .array()
        .map((err) => ({ field: err.param, message: err.msg })),
    });
  }
  next();
};

module.exports = {
  bookValidationRules,
  validateBookId,
  validateBook,
};
