const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

// Start Google authentication
router.get("/google", (req, res, next) => {
  console.log("Redirecting to Google login...");
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});


// Google OAuth callback
// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.NODE_ENV === "production"
      ? "https://cse341p2-mokj.onrender.com"
      : "http://localhost:3000",
  }),
  (req, res) => {
    // Log session info to see if the session is set
    console.log("Session set after Google login: ", req.sessionID);
    res.redirect("/");  // Redirect after successful login
  }
);



// Get current user info
router.get("/me", (req, res) => {
  userController.getCurrentUser(req, res);
});

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // Ensure `next` is passed correctly
    res.redirect("/"); // Redirect after successful logout
  });
});

module.exports = router;
