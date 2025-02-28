const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../utils/authMiddleware");
const {
  userValidationRules,
  validateUser,
  validateUserId,
  userUpdateValidationRules,
} = require("../utils/userValidation");

// Get all users
router.get("/", authenticateUser, userController.getAllUsers);

// Get user by ID
router.get(
  "/:id", 
  authenticateUser,
  validateUserId(), 
  userController.getUserById
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
  userController.deleteUser
);

// register user
router.post(
  "/register",
  userValidationRules(), 
  validateUser, 
  userController.createUser
);

module.exports = router;
