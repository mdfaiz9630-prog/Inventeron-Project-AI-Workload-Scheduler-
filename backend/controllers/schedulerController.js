const Task = require("../models/taskModel");
const { runScheduler } = require("../services/schedulerService");
const { buildNodePayload } = require("../services/schedulerEngine");

exports.runScheduler = async (req, res) => {
  try {
    const tasksFromDB = await Task.find({
      status: { $in: ["pending", "queued", "running"] },
    }).sort({ priority: 1 });

    const tasks = tasksFromDB.map(task => ({
      name: task.title,
      type: task.modelType || "cnn",
      size: Number(task.inputSize || task.duration || 0),
      priority: task.priority
    }));

    const nodes = buildNodePayload();

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