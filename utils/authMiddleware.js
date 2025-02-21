const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Passport automatically adds `isAuthenticated()` to the request
    return next(); // Proceed to the next middleware or route handler
  }
  res.status(401).json({ error: "Unauthorized: No session" }); // Return Unauthorized if not authenticated
};

module.exports = authenticateUser;
