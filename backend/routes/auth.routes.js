const express = require("express");
const authRouter = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");

authRouter.post("/register", register);
authRouter.get("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter