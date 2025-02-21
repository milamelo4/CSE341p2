const { body, param, validationResult } = require("express-validator");

const userValidationRules = () => [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop validation if empty
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid"),
];


// validate user id
const validateUserId = () => {
    return [
        param("id").isMongoId().withMessage("Invalid user ID format. Must be a 24-character hex string."),
    ];
};

// Validate user input
const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Ensure errors contain the correct field name (`param`)
    const errorMessages = errors.array().map(({ msg, param }) => ({
      field: param || "unknown_field", // Ensure field name is always present
      message: msg,
    }));

    // Log the errors for debugging
    //console.log("Validation Errors:", errorMessages);

    return next({
      status: 400,
      message: "Validation failed",
      errors: errorMessages, // <-- FIX: Changed `details` to `errors`
    });
  }

  next();
};


// Validate user update input
const userUpdateValidationRules = () => [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  // Removed password validation as it's no longer relevant
  body("email")
    .optional()
    .custom(() => {
      throw new Error("Email updates are not allowed");
    }),
];


module.exports = {
  userValidationRules,
  validateUser, 
  validateUserId,
  userUpdateValidationRules,   
};