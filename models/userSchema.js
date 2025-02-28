const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Users schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }, // Password is required only if NOT using Google OAuth
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users with NULL googleId
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users", // Collection name in MongoDB
  }
);

// Pre-save middleware to hash the password (only if password exists)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next(); // Skip hashing if no password

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
