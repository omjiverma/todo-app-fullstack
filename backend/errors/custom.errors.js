const { StatusCodes } = require("http-status-codes");

class customAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class UnauthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError
};