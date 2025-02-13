const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error.stack);
  }

  const statusCode = error.status || 500;
  // If is a validation error, format it properly
  if (error.details) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((e) => e.msg), // Extract error messages
    });
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong!",
  });
};

module.exports = errorHandler;