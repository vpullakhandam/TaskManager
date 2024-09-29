import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onToggle, isDarkMode }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
    className={`mb-4 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-800 to-gray-900"
        : "bg-gradient-to-br from-indigo-50 to-purple-50"
    }`}
  >
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="w-5 h-5 border-indigo-400 rounded focus:ring-indigo-500"
          />
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.completed
                  ? "line-through text-gray-400"
                  : isDarkMode
                  ? "text-indigo-300"
                  : "text-indigo-700"
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className={`${
              isDarkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className={`${
              isDarkMode
                ? "text-red-400 hover:text-red-300"
                : "text-red-600 hover:text-red-800"
            }`}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    setError("");
    if (!newTask.title.trim()) {
      setError("Please add a title for the task.");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/tasks", newTask);
      setNewTask({ title: "", description: "", completed: false });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(
        `http://localhost:4000/api/tasks/${task._id}`,
        updatedTask
      );
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/tasks/${editingTask._id}`,
        editingTask
      );
      setTasks(
        tasks.map((task) => (task._id === editingTask._id ? editingTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      } py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl font-extrabold text-center bg-clip-text text-transparent ${
              isDarkMode
                ? "bg-gradient-to-r from-indigo-300 to-purple-300"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            Task Manager
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-indigo-600 text-white"
            }`}
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        <motion.form
          onSubmit={addTask}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg rounded-lg overflow-hidden`}
          >
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full font-bold py-2 px-4 rounded-md transition duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  }`}
                >
                  <PlusIcon className="h-5 w-5 inline mr-2" />
                  Add Task
                </motion.button>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.form>

        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={startEditing}
              onDelete={deleteTask}
              onToggle={toggleComplete}
              isDarkMode={isDarkMode}
            />
          ))}
        </AnimatePresence>

        {editingTask && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg w-full max-w-md`}
            >
              <div className="p-6">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-indigo-300" : "text-indigo-700"
                  }`}
                >
                  Edit Task
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    }`}
                  />
                  <input
                    type="text"
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    }`}
                  />
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelEditing}
                      className={`px-4 py-2 rounded-md transition duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveEdit}
                      className={`px-4 py-2 rounded-md transition duration-300 ${
                        isDarkMode
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
