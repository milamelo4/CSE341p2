require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("./models"); // Ensures DB connection happens before starting
const routes = require("./routes");
const cors = require("cors");

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);



// Basic route to test if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to my Books API!");
});

// Ensure MongoDB is connected before starting the server
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open. Starting server...");
  app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
