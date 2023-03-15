// This module exports functions related to JSON Web Tokens (JWT) and cookies.

const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// createJWT function creates a JWT with the given payload and returns it
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// isTokenValid function verifies the given JWT and returns the decoded payload if valid
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// attachCookiesToResponse function creates a JWT and attaches it to the response object as an HTTP cookie
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const twoDay = 1000 * 60 * 60 * 24 * 2;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + twoDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
