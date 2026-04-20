const Task = require("../models/taskModel");

// @desc   Get scheduled tasks
// @route  GET /api/scheduler
// @access Public
const getSchedule = async (req, res) => {
  try {
    // 1. Get all tasks from DB
    const tasks = await Task.find();

    // 2. Simple scheduling logic (temporary)
    // Sort by priority (lower number = higher priority)
    const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);

    // 3. Return response
    res.json({
      message: "Schedule generated successfully",
      totalTasks: sortedTasks.length,
      schedule: sortedTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error generating schedule",
      error: error.message,
    });
  }
};

module.exports = {
  getSchedule,
};