const crypto = require("crypto");
const mongoose = require("mongoose");
const Task = require("../models/taskModel");

const memoryTasks = [];

const shouldUseDb = () => {
  return mongoose.connection.readyState === 1 && !process.env.FORCE_MEMORY_STORE;
};

const sortByCreatedAtDesc = (tasks) =>
  [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const createMemoryTask = (payload) => {
  const now = new Date();
  return {
    _id: crypto.randomUUID(),
    title: payload.title,
    priority: Number(payload.priority ?? 1),
    duration: Number(payload.duration ?? 30),
    modelType: payload.modelType || "cnn",
    inputSize: Number(payload.inputSize ?? payload.duration ?? 0),
    utilizationPercent: Number(payload.utilizationPercent ?? 0),
    status: payload.status || "pending",
    assignedNode: payload.assignedNode || null,
    startedAt: payload.startedAt || null,
    completedAt: payload.completedAt || null,
    loadImpact: Number(payload.loadImpact || 0),
    createdAt: now,
  };
};

const createTask = async (payload) => {
  if (shouldUseDb()) {
    const saved = await new Task(payload).save();
    return saved.toObject();
  }

  const task = createMemoryTask(payload);
  memoryTasks.push(task);
  return task;
};

const getAllTasks = async () => {
  if (shouldUseDb()) {
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    return tasks;
  }
  return sortByCreatedAtDesc(memoryTasks);
};

const getActiveTasks = async () => {
  if (shouldUseDb()) {
    const tasks = await Task.find({
      status: { $in: ["pending", "queued", "running"] },
    })
      .sort({ priority: 1 })
      .lean();
    return tasks;
  }

  return memoryTasks
    .filter((task) => ["pending", "queued", "running"].includes(task.status))
    .sort((a, b) => a.priority - b.priority);
};

const updateTask = async (id, patch) => {
  if (shouldUseDb()) {
    return Task.findByIdAndUpdate(id, patch, { new: true }).lean();
  }

  const index = memoryTasks.findIndex((task) => task._id === String(id));
  if (index === -1) return null;
  memoryTasks[index] = { ...memoryTasks[index], ...patch };
  return memoryTasks[index];
};

const deleteTask = async (id) => {
  if (shouldUseDb()) {
    return Task.findByIdAndDelete(id).lean();
  }

  const index = memoryTasks.findIndex((task) => task._id === String(id));
  if (index === -1) return null;
  const [deleted] = memoryTasks.splice(index, 1);
  return deleted;
};

const clearTasks = async () => {
  if (shouldUseDb()) {
    await Task.deleteMany({});
    return;
  }
  memoryTasks.splice(0, memoryTasks.length);
};

module.exports = {
  createTask,
  getAllTasks,
  getActiveTasks,
  updateTask,
  deleteTask,
  clearTasks,
};
