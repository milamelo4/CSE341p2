const mongoose = require("mongoose");
const dbConfig = require("../config/connect");

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = { connectDB, mongoose };
