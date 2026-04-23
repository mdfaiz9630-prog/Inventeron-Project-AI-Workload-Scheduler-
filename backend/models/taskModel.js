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
    type: Number, // in minutes
    default: 30,
  },
  status: {
    type: String,
    default: "pending", // pending | running | completed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);