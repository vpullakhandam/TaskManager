const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Defining the Schema
const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
