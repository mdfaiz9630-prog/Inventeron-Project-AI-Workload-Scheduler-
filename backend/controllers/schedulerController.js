const Task = require("../models/taskModel");
const { runScheduler } = require("../services/schedulerService");

exports.runScheduler = async (req, res) => {
  try {
    const tasksFromDB = await Task.find().sort({ priority: 1 });

    const tasks = tasksFromDB.map(task => ({
      name: task.title,
      type: "cnn",
      size: task.duration,
      priority: task.priority
    }));

    const nodes = [
      { name: "GPU-1", type: "gpu", load: 0 },
      { name: "GPU-2", type: "gpu", load: 0 },
      { name: "CPU-1", type: "cpu", load: 0 }
    ];

    const result = await runScheduler(tasks, nodes);

    res.json({
      message: "AI-based scheduling complete",
      nodes: result.nodes,
      schedule: result.schedule
    });

  } catch (error) {
    console.error("Scheduler error:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
};