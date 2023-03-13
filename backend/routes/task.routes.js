const express = require("express");
const taskRouter = express.Router();
const {
  authenticateUser,
} = require("../middlewares/authentication.middleware");

const {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
} = require("../controllers/task.controller");

taskRouter
  .route("/")
  .post(authenticateUser, createTask)
  .get(authenticateUser, getAllTask);
taskRouter
  .route("/:id")
  .patch(authenticateUser, updateTask)
  .delete(authenticateUser, deleteTask);

  module.exports = taskRouter;
