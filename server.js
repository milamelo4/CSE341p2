require("dotenv").config(); // Load environment variables
require("./config/passport"); // Load Passport configuration

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("./models"); // Ensures DB connection happens before starting
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const passport = require("passport");
const session = require("express-session");

// Middleware
app.use(cors());
app.use(express.json());

// Configure session middleware
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI for session storage
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only set cookies in production
      sameSite: "lax", // Mitigates CSRF attacks
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Basic route to test if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to my Books API!");
});

// Routes middleware
app.use("/", routes);

// Error handler middleware
app.use(errorHandler);

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
