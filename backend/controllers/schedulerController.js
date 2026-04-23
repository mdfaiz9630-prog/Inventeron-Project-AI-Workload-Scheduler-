const Task = require("../models/taskModel");

exports.runScheduler = async (req, res) => {
  console.log("Scheduler route hit");

  try {
    const tasks = await Task.find().sort({ priority: 1 });

    res.json({
      message: "Scheduler working",
      count: tasks.length,
      schedule: tasks
    });

  } catch (error) {
    console.error("Scheduler error:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
};