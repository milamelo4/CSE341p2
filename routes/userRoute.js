const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userValidationRules, validateUser, validateUserId } = require("../utils/userValidation");
const errorHandler = require("../utils/errorHandler");

router.get("/", userController.getAllUsers);
router.get("/:id", validateUserId(), userController.getUserById);
router.post("/", userValidationRules(), validateUser, userController.createUser);
router.put("/:id", userValidationRules(), validateUser, userController.updateUser);
router.delete("/:id", validateUserId(), userController.deleteUser);

module.exports = router;
