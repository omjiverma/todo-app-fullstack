// Import Task model and Http status codes
const Task = require("../models/task.model");
const { StatusCodes } = require("http-status-codes");

// Import custom errors
const { BadRequestError, NotFoundError } = require("../errors/custom.errors");

// Create a new task controller
const createTask = async (req, res) => {
  // Set the user id of the task to the authenticated user id
  req.body.user = req.user.userId;
  const { task } = req.body;

  // If no task provided throw bad request error
  if (!task) {
    throw new BadRequestError("Please provide task");
  }

  // Create the new task
  const createdTask = await Task.create(req.body);

  // Send the created task in the response
  res.status(StatusCodes.CREATED).json({ createdTask });
};

// Update an existing task controller
const updateTask = async (req, res) => {
  // Get the task id and authenticated user id
  const taskId = req.params.id;
  const { userId } = req.user;

  // Find the task with the given id and user id
  const foundTask = await Task.findOne({ _id: taskId, user: userId });

  // If task not found, throw not found error
  if (!foundTask) {
    throw new NotFoundError(
      `No task found with id ${taskId} for the requesting user`
    );
  }

  // Update the task with the given task id and user id
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { task: req.body.task },
    { new: true }
  );

  // Send the updated task in the response
  res.status(StatusCodes.OK).json({ updatedTask });
};

// Delete an existing task controller
const deleteTask = async (req, res) => {
  // Get the task id and authenticated user id
  const taskId = req.params.id;
  const { userId } = req.user;

  // If no task id provided throw bad request error
  if (!taskId) {
    throw new BadRequestError("Please provide task id");
  }

  // Find the task with the given id and user id and delete it
  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  // If task not found, throw not found error
  if (!deletedTask) {
    throw new NotFoundError(
      `No task found with id ${taskId} for the requesting user`
    );
  }

  // Send the deleted task in the response
  res.status(StatusCodes.OK).json({ deletedTask });
};

// Get all tasks of the authenticated user controller
const getAllTasks = async (req, res) => {
  // Get the authenticated user id
  const { userId } = req.user;

  // Find all tasks with the given user id
  const allTasks = await Task.find({ user: userId });

  // Send all tasks and the count of tasks in the response
  res.status(StatusCodes.OK).json({ allTasks, count: allTasks.length });
};

// Export all controllers
module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
