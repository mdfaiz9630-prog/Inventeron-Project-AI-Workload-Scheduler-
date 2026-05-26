const { getNodeStatus } = require("../services/schedulerEngine");
const taskRepository = require("../services/taskRepository");

exports.runScheduler = async (req, res) => {
  try {
    const tasks = await taskRepository.getAllTasks();
    const activeSchedule = tasks
      .filter((task) => ["running", "queued", "pending"].includes(task.status))
      .map((task) => ({
        task: task.title,
        assigned_node: task.assignedNode || "QUEUED",
        predicted_time: Number(task.inputSize || task.duration || 0),
        utilization: Number(task.loadImpact || task.utilizationPercent || 0),
      }));

    const nodes = Object.entries(getNodeStatus()).map(([name, node]) => ({
      name,
      type: node.type,
      load: node.load,
      capacity: node.capacity,
    }));

    res.json({
      message: "Load-balanced scheduling state",
      nodes,
      schedule: activeSchedule
    });

  } catch (error) {
    console.error("Scheduler error:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
};