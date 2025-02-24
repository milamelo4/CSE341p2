const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

const {
  userValidationRules,
  validateUser,
  validateUserId,
  userUpdateValidationRules
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

module.exports = router;
