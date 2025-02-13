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
const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //remove password from error message
       const errorMessages = errors.array().map(error => {
           if (error.path === 'password') {
              delete error.value; // remove password from error message
           }
           return error;
       })
        return res.status(400).json({ errors: errorMessages });
    }        
    next();
};

module.exports = {
    userValidationRules,
    validateUser, 
    validateUserId   
};