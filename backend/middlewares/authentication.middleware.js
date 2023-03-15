// Import custom error class and jwt utility function
const { UnauthenticatedError } = require("../errors/custom.errors");
const { isTokenValid } = require("../utils/jwt.utils");

// Middleware to authenticate user with token
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; // get token from signed cookies
  if (!token) {
    throw new UnauthenticatedError("Invalid Authentication"); // throw error if token is not present
  }
  try {
    const { userId, user } = isTokenValid({ token }); // validate the token and get user details from it
    req.user = { userId, user }; // attach user details to request object
    next(); // call next middleware
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication"); // throw error if token is invalid
  }
};

module.exports = {
  authenticateUser,
};

