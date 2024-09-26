const express = require("express");
const app = express();
const Task = require("../models/Task");

// GET REQUEST

app.get("/api/tasks", (req, res) => {
  Task.find()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// POST REQUEST

app.post("/api/tasks", (req, res) => {
  const { title, description, completed } = req.body;

  const newTask = new Task({
    title,
    description,
    completed,
  });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// GET task based on 'id'

app.get("/api/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// PUT which is used for 'UPDATING' the task

app.put("/api/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      (task.title = req.body.title),
        (task.description = req.body.description),
        (task.completed = req.body.completed);

      task
        .save()
        .then(() => res.json("Task Updated!"))
        .catch((err) => res.status(400).json(`Error ${err}`));
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// DELETE a task by 'id'

app.delete("/api/tasks/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Task Deleted!");
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});
