const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error.stack);
  }

  let statusCode = error.status || 500;
  // If is a validation error, format it properly
  if (error.details) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((e) => e.msg), // Extract error messages
    });
  }

  // handle validation errors
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(error.errors).map(e => e.message)
    });
  }

  // handle invalid MongoDB id errors
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  // default error handler
  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong!",
  });
};

module.exports = errorHandler;