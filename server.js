require("dotenv").config(); // Load environment variables
require("./config/passport"); // Load Passport configuration

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connectDB } = require("./models"); // Ensures DB connection happens before starting
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const passport = require("passport");
const mongoose = require("mongoose");

// Middleware
app.use(cors());

app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Basic route to test if the server is running
app.get("/", (req, res) => {
  res.send("Users and Books API!");
});

// Routes middleware
app.use("/", routes);

// Error handler middleware
app.use(errorHandler);

// Ensure MongoDB is connected before starting the server
connectDB()
  .then(() => {
    console.log("MongoDB connection is open. Starting server...");
    app.listen(port, () => {
      console.log(`Server is running on http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
