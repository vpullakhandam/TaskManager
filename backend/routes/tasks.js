const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST a new task
router.post("/", (req, res) => {
  const { title, description, completed } = req.body;

  const newTask = new Task({
    title,
    description,
    completed
  });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET a task by ID
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json("Error: " + err));
});

// UPDATE a task by ID
router.put("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;

      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// DELETE a task by ID
router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
