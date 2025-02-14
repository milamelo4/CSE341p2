const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  userValidationRules,
  validateUser,
  validateUserId,
  userUpdateValidationRules
} = require("../utils/userValidation");

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get(
    "/:id", 
    validateUserId(), 
    userController.getUserById);

// Create a new user
router.post(
  "/",
  userValidationRules(),
  validateUser,
  userController.createUser
);

// Update user
router.put(
  "/:id",
  validateUserId(),
  userUpdateValidationRules(),
  validateUser,
  userController.updateUser
);

// Delete user
router.delete(
    "/:id", 
    validateUserId(), 
    userController.deleteUser);

module.exports = router;
