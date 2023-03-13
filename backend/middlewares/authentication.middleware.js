const { UnauthenticatedError } = require("../errors/custom.errors");

const { isTokenValid } = require("../utils/jwt.utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = {
  authenticateUser,
};
