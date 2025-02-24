const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoute"));
router.use("/auth", require("./authRoute")); 
router.use("/", require("./swaggerRoutes"));

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      } else {
        res.clearCookie("connect.sid"); // Default cookie name for express-session
        return res.status(200).json({ message: "Logged out successfully" });
      }
    });
  } else {
    res.status(200).json({ message: "No active session to log out" });
  }
});


module.exports = router;