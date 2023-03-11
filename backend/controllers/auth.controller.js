const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/custom.errors");
const {attachCookiesToResponse} = require('../utils/jwt.utils')

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

    res.status(StatusCodes.CREATED).json({ msg: "Registration successful. Please login."});
  };


// Login Controller
const login = async (req, res) => {
  res.send("Login");
};



const logout = async (req, res) => {
  res.send("Logout");
};



module.exports = {
  register,
  login,
  logout,
};
