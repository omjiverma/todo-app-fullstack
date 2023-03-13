// Packages Import
const path = require("path");
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
const taskRouter = require("./routes/task.routes")

// Middleware
app.use(cors({
  origin:'http://localhost:3000'
}))
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/api/v1", (req, res) => {
  res.send("Get Request to Api route");
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
