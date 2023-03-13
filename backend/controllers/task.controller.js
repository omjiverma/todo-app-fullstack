const Task = require("../models/task.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/custom.errors");

const createTask = async (req, res) => {
  req.body.user = req.user.userId;
  const { task } = req.body;
  if (!task) {
    throw new BadRequestError("Please provide task");
  }
  const createdTask = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ createdTask });
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.user;
  const foundTask = await Task.findOne({ _id: taskId, user: userId });
  if (!foundTask) {
    throw new NotFoundError(
      `No task found with id ${taskId} for the requesting user`
    );
  }
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { task: req.body.task },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ updatedTask });
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.user;

  if (!taskId) {
    throw new BadRequestError("Please provide task id");
  }

  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });
  if (!deletedTask) {
    throw new NotFoundError(
      `No task found with id ${taskId} for the requesting user`
    );
  }

  res.status(StatusCodes.OK).json({ deletedTask });
};

const getAllTasks = async (req, res) => {
  const { userId } = req.user;
  const allTasks = await Task.find({ user: userId });
  res.status(StatusCodes.OK).json({ allTasks, count: allTasks.length });
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
