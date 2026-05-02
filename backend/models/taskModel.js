const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  priority: {
    type: Number,
    default: 1,
  },

  duration: {
    type: Number, // in minutes or seconds (your choice)
    default: 30,
  },

  modelType: {
    type: String,
    default: "cnn",
  },

  inputSize: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "pending", 
    // pending | queued | running | completed
  },

  // ✅ IMPORTANT: scheduler output stored here
  assignedNode: {
    type: String,
    default: null,
  },

  // optional but useful for real system simulation
  startedAt: {
    type: Date,
    default: null,
  },

  completedAt: {
    type: Date,
    default: null,
  },

  loadImpact: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);