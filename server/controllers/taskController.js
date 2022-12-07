const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

const createTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    throw new Error("Please add a text field");
  }
  const task = await Task.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.json(task);
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new Error("Task not found");
  if (!req.user) throw new Error("User not found");
  if (task.user.toString() !== req.user.id)
    throw new Error("User not authorized");

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) throw new Error("Task not found");
  if (!req.user) throw new Error("User not found");
  if (task.user.toString() !== req.user.id)
    throw new Error("User not authorized");
  await task.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
