const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: '${value}' for '${field}'`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  // JWT error - invalid token
  if (err.name === "JsonWebTokenError") {
    error = new ErrorResponse("Invalid token. Please log in again.", 401);
  }

  // JWT error - expired token
  if (err.name === "TokenExpiredError") {
    error = new ErrorResponse("Token has expired. Please log in again.", 401);
  }

  // Return final response
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
    error: error,
  });
};

module.exports = errorHandler;
