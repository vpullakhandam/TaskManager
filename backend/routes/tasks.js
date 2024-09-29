const express = require("express");
const router = express.Router();
const Task = require("../models/db");

// GET all the tasks

router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.json(task);
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

// POST a new task to the database

router.post("/", async (req, res) => {
  const { title, description, completed } = req.body;

  const newTask = new Task({
    title,
    description,
    completed,
  });

  try {
    await newTask.save();
    res.json("Task added!");
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

// GET using a specific 'id'

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("Task not found!!");
    }
    res.json(task);
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

// PUT (UPDATE) a task

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("Task not found!!");
    }
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;

    await task.save();
    res.json("Task updated!!");
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

// DELETE a task using 'id'

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("Task not found!!");
    }
    res.json("Task deleted!");
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

module.exports = router;
