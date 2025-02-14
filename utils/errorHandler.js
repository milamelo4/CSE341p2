const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error.stack);
  }

  let statusCode = error.status || 500;

  // If it's a validation error from express-validator, format it properly
  if (error.errors) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.errors, // Ensure this matches what `validateUser` passes
    });
  }

  // Handle Mongoose validation errors
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(error.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Handle invalid MongoDB ID errors
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  // Default error handler
  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong!",
  });
};

module.exports = errorHandler;
