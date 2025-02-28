const User = require("../models/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Create a new user (manual registration) Should not return a token
const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully. Please log in." });
  } catch (error) {
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

// Get the currently authenticated user
const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json({ user: req.user });
};

// Login user and generate JWT
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //console.log("Password entered:", password);
    //console.log("Password in DB:", user.password);

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //console.log("Password valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

// logout user
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};


// Export all functions
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  loginUser,
  logoutUser
};
