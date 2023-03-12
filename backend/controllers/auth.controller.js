const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/custom.errors");
const { attachCookiesToResponse } = require("../utils/jwt.utils");

// Register Controller
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // Check for Email in use
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("This email is already registered.");
  }
  // Add User To DataBase
  const user = await User.create({ firstName, lastName, email, password });

  // const userToken = {  userId:user._id,firstName, lastName, email };
  // attachCookiesToResponse({res, user:userToken})

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Registration successful. Please login." });
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  const user = await User.findOne({ email });
  if(!user){
    throw new UnauthenticatedError('User does not exist')
  }

  const isPasswordMatch =  await user.matchPassword(password)
  if(!isPasswordMatch){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const userToken = {  userId:user._id,user:user.firstName,email:user.email };
  attachCookiesToResponse({res, user:userToken})
  res
  .status(StatusCodes.OK)
  .json({ user:userToken });
};


const logout = async (req, res) => {
  res.cookie("token", " logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};


module.exports = {
  register,
  login,
  logout,
};
