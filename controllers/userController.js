const User = require("../models/userSchema");
const mongoose = require("mongoose");
const admin = require("../config/firebase");


// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Fetch all users from MongoDB | Exclude the password field
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get a user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid user ID format" }); // Use next() to pass the error to the error handler middleware 
  }
  try {
    const user = await User.findById(id).select("-password"); // Exclude the password field
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "Contact created successfully",
      userId: savedUser._id,
    });
    
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return next({ status: 400, message: "Email already exists" });
    }
    next(error);
  }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;

  // Validate MongoDB ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid user ID format" });
  }

  try {
    // Remove email from the update payload
    const { email, ...updateFields } = req.body;

    // Update only provided fields (excluding email)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next({ status: 404, message: "User not found" });
    }

    res.status(204).send(); // No Content (Success)
  } catch (error) {
    next(error);
  }
};


// Delete a user by ID
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid MongoDB id
    return next({ status: 400, message: "Invalid user ID" });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return next({ status: 404, message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

// Export all functions
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
