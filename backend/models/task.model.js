const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    task:{
        type:String,
        required: [true, "Please provide task"]
    },
    status:{
        type:Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
})

module.exports = mongoose.model("Task", TaskSchema);