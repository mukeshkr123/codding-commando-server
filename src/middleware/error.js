const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB error (CastError)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400); // Use 400 for "Bad Request" errors
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error (JsonWebTokenError)
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid, please try again";
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error (TokenExpiredError)
  if (err.name === "TokenExpiredError") {
    const message = "Session expired, please login again";
    err = new ErrorHandler(message, 401); // Use 401 for "Unauthorized" errors
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

module.exports = ErrorMiddleware;
