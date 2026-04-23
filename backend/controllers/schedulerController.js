const Task = require("../models/taskModel");

exports.runScheduler = async (req, res) => {
  try {
    // Fetch tasks sorted by priority
    const tasks = await Task.find().sort({ priority: 1 });

    // Simulated compute nodes
    let nodes = [
      { name: "GPU-1", load: 0 },
      { name: "GPU-2", load: 0 },
      { name: "CPU-1", load: 0 }
    ];

    // Load-balanced scheduling + performance analysis
    const scheduledTasks = tasks.map(task => {

      // Select least loaded node
      nodes.sort((a,b) => a.load - b.load);
      let selectedNode = nodes[0];

      // Increase node load using task duration
      selectedNode.load += task.duration;

      return {
        task: task.title,
        priority: task.priority,
        duration: task.duration,

        assignedNode: selectedNode.name,
        currentNodeLoad: selectedNode.load,

        // Simulated performance analyzer metrics
        inferenceTimeMs: task.duration * 42,
        memoryUsageMB: task.duration * 8,
        utilizationPercent: Math.min(selectedNode.load * 2, 100)
      };

    });

    res.json({
      message: "Load balanced scheduling + performance analysis complete",
      nodes,
      schedule: scheduledTasks
    });

  } catch (error) {
    console.error("Scheduler error:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
};