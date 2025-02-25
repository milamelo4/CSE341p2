const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const {
  userValidationRules,
  validateUser,
  validateUserId,
  userUpdateValidationRules,
  userRegistrationValidationRules
} = require("../utils/userValidation");
const authenticateUser = require("../utils/authMiddleware");

// Get all users
router.get("/", authenticateUser, userController.getAllUsers);

// Get user by ID
router.get(
    "/:id", 
    authenticateUser,
    validateUserId(), 
    userController.getUserById);

// Update user
router.put(
  "/:id",
  authenticateUser,
  validateUserId(),
  userUpdateValidationRules(),
  validateUser,
  userController.updateUser
);

// Delete user
router.delete(
    "/:id",
    authenticateUser, 
    validateUserId(), 
    userController.deleteUser);

// register user
router.post("/register",
   userValidationRules(), 
   validateUser, 
   userController.createUser);

module.exports = router;
