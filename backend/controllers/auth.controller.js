// Import necessary modules
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/custom.errors");
const { attachCookiesToResponse } = require("../utils/jwt.utils");

// Register Controller - Register a new user
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // Check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("This email is already registered.");
  }
  // Add user to the database
  const user = await User.create({ firstName, lastName, email, password });

  // Generate user token and attach to the response cookie
  const userToken = { userId: user._id, firstName, lastName, email };
  attachCookiesToResponse({ res, user: userToken });

  // Send response to the client
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Registration successful. Please login." });
};

// Login Controller - Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  // Check if user exists with the provided email
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("User does not exist");
  }

  // Check if the provided password matches with the stored hashed password
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Generate user token and attach to the response cookie
  const userToken = {
    userId: user._id,
    user: user.firstName,
    email: user.email,
  };
  attachCookiesToResponse({ res, user: userToken });

  // Send response to the client
  res.status(StatusCodes.OK).json({ user: userToken });
};

// Logout Controller - Logout user
const logout = async (req, res) => {
  // Remove the token from the cookies and set an expired date
  res.cookie("token", " logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  // Send response to the client
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

// Export the controllers
module.exports = {
  register,
  login,
  logout,
};
