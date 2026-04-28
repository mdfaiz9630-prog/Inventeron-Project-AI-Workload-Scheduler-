const Task = require("../models/taskModel");
const { scheduleTask, nodes } = require("../services/schedulerEngine");

// ---------------- CREATE TASK ----------------
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    // assign node using scheduler
    const result = scheduleTask(task);

    task.assignedNode = result.assignedNode;
    task.status = "running";
    task.startedAt = new Date();

    await task.save();

    console.log(`Task created → ${task.title} → ${task.assignedNode}`);

    // simulate execution completion
    setTimeout(async () => {
      try {
        task.status = "completed";
        task.completedAt = new Date();

        // release node load safely
        if (nodes[task.assignedNode]) {
          nodes[task.assignedNode].load -= task.duration;

          if (nodes[task.assignedNode].load < 0) {
            nodes[task.assignedNode].load = 0;
          }
        }

        await task.save();

        console.log(`Task completed → ${task.title}`);

      } catch (err) {
        console.error("Completion error:", err.message);
      }
    }, task.duration * 1000);

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET TASKS ----------------
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET NODES (for frontend) ----------------
exports.getNodes = async (req, res) => {
  try {
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};