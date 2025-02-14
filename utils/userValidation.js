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

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail() // Stop validation if empty
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
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
  body("password")
    .optional()
    .bail()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character"
    ),
  body("email")
    .optional()
    .custom((value, { req }) => {
      throw new Error("Email updates are not allowed");
    }),
];

module.exports = {
    userValidationRules,
    validateUser, 
    validateUserId,
    userUpdateValidationRules,   
};