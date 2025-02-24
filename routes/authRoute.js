const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userController = require("../controllers/userController");

// Generate JWT after successful Google authentication
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

// Start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback - returns JWT instead of relying on sessions
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: req.user,
    });
  }
);

// Get current user info (protected route should use token verification middleware)
router.get("/me", (req, res) => {
  userController.getCurrentUser(req, res);
});

module.exports = router;
