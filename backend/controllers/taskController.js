const Task = require("../models/taskModel");
const { scheduleTask, nodes } = require("../services/schedulerEngine");


// ---------------- CREATE TASK ----------------
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    const result = scheduleTask(task);

    task.assignedNode = result.assignedNode;
    task.status = "running";
    task.startedAt = new Date();

    await task.save();

    if (global.io) {
      global.io.emit("schedulerUpdate", {
        event: "task_created",
        task
      });
    }

    setTimeout(async () => {
      task.status = "completed";
      task.completedAt = new Date();

      if (nodes[task.assignedNode]) {
        nodes[task.assignedNode].load -= task.duration;
        if (nodes[task.assignedNode].load < 0) {
          nodes[task.assignedNode].load = 0;
        }
      }

      await task.save();

      if (global.io) {
        global.io.emit("schedulerUpdate", {
          event: "task_completed",
          task
        });
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


// ---------------- GET NODES ----------------
exports.getNodes = async (req, res) => {
  try {
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- DELETE SINGLE TASK ----------------
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (global.io) {
      global.io.emit("schedulerUpdate", {
        event: "task_deleted",
        taskId: id
      });
    }

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- CLEAR ALL TASKS ----------------
exports.clearTasks = async (req, res) => {
  try {

    await Task.deleteMany({});

    if (global.io) {
      global.io.emit("schedulerUpdate", {
        event: "tasks_cleared"
      });
    }

    res.json({ message: "All tasks cleared" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};