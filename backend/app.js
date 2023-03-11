// Packages Import
const express = require("express");
const app = express();
const morgan = require("morgan");

require("express-async-errors");
require("dotenv").config();

// Middlewares Import
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

// Middleware
app.use(morgan("tiny"));
app.use(express.json())

// Routes
app.get("/", (req, res) => {
  res.send("----Get Request to home routes-----");
});

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
