const Task = require('../models/task.model')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/custom.errors");

const createTask = async (req, res) => {
    res.send('Create A Task')
}

const updateTask = async (req, res) => {
    res.send('Update A Task')
}

const deleteTask = async (req, res) => {
    res.send('Delete A Task')
}

const getAllTask = async(req, res) =>{
    res.send('Get All Task')
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask
}