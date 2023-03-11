// Packages Import
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const cors = require('cors')

require("express-async-errors");
require("dotenv").config();

// Middlewares Import
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

// Router Imports
const authRouter = require("./routes/auth.routes");

// Middleware
app.use(cors({
  origin:'http://localhost:3000'
}))
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

// Routes
app.get("/", (req, res) => {
  res.send("----Get Request to home routes-----");
});

app.use("/api/v1/auth", authRouter);


// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
