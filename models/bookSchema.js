const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
      min: 1000, // Ensures realistic years
      max: new Date().getFullYear(),
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "books", // Collection name in MongoDB
  }
);

// Export the Book model
module.exports = mongoose.model("Book", bookSchema);
