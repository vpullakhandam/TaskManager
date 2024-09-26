const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    completed: {
      type: String,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
