const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

// Start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/", // Redirect after successful login
  })
);

// Get current user info
router.get("/me", (req, res) => {
  userController.getCurrentUser(req, res);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
