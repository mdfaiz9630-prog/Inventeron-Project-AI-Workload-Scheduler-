const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  priority: String,
});

module.exports = mongoose.model("Task", taskSchema);