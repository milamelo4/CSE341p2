const { body, param, validationResult } = require("express-validator");

const userValidationRules = () => {
    return [
        body("firstName").trim().notEmpty().withMessage("Name is required"),
        body("lastName").trim().notEmpty().withMessage("Last name is required"),
        body("email").trim().notEmpty().normalizeEmail().isEmail().withMessage("Email is not valid"),
        body("password").notEmpty().isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"),    
    ];
};

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
    // Format errors while ensuring password is not exposed
    const errorMessages = errors
      .array()
      .map(({ msg, param }) => ({
        field: param === "password" ? undefined : param, // Exclude password field
        message: msg,
      }))
      .filter((error) => error.field !== undefined); // Remove undefined fields

    return next({
      status: 400,
      message: "Validation failed",
      errors: errorMessages,
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
  body("email").not().exists().withMessage("Email updates are not allowed"), // Prevent email updates
];

module.exports = {
    userValidationRules,
    validateUser, 
    validateUserId,
    userUpdateValidationRules,   
};