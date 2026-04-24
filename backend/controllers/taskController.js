const Task = require("../models/taskModel");
const { scheduleTask } = require("../services/schedulerEngine");

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    
    const result = scheduleTask(task);

    task.assignedNode = result.assignedNode;
    task.status = "running"; // important (not pending)

    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};