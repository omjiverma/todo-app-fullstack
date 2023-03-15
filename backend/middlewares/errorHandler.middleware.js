const { StatusCodes } = require("http-status-codes");

// Middleware function to handle errors
const errorHandlerMiddleware = (err, req, res, next) => {
  // Set default error values
  defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Please try again later.",
  };

  // If error is a Mongoose validation error, set status code to BAD_REQUEST
  // and concatenate all error messages into one string
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  }

  // If error code is 11000 (duplicate key error), set status code to BAD_REQUEST
  // and create an error message indicating which field has to be unique
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  // If error is a Mongoose CastError, set status code to NOT_FOUND
  // and create an error message indicating the invalid input value
  if (err.name === 'CastError') {
    defaultError.statusCode = StatusCodes.NOT_FOUND;
    defaultError.msg = `Invalid input value: ${err.value}`;
  }

  // Send response with error message and status code
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandlerMiddleware;
