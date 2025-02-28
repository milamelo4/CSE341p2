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
    { expiresIn: "1h" } //  expires in 1 hour
  );
};

// Start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback - returns JWT
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


// login user
router.post("/login", userController.loginUser);

// logout user
router.post("/logout", userController.logoutUser);

module.exports = router;
