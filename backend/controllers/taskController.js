const { scheduleTask, releaseNodeLoad, resetNodes } = require("../services/schedulerEngine");
const taskRepository = require("../services/taskRepository");


// ---------------- CREATE TASK ----------------
exports.createTask = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      inputSize: req.body.inputSize || req.body.duration,
    };

    const result = await scheduleTask(payload);

    const createdTask = await taskRepository.createTask({
      ...payload,
      assignedNode: result.assignedNode,
      status: result.status,
      loadImpact: result.loadImpact,
      startedAt: result.status === "running" ? new Date() : null,
    });

    let task = createdTask;
    if (result.status === "running") {
      setTimeout(async () => {
        const updated = await taskRepository.updateTask(task._id, {
          status: "completed",
          completedAt: new Date(),
        });

        if (!updated) {
          return;
        }

        releaseNodeLoad(updated.assignedNode, updated.loadImpact);
        task = updated;

        if (global.io) {
          global.io.emit("schedulerUpdate", {
            event: "task_completed",
            task,
          });
        }
      }, Number(task.duration) * 1000);
    }

    if (global.io) {
      global.io.emit("schedulerUpdate", {
        event: "task_created",
        task
      });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- GET TASKS ----------------
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskRepository.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- DELETE SINGLE TASK ----------------
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await taskRepository.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (deleted.status === "running") {
      releaseNodeLoad(deleted.assignedNode, deleted.loadImpact);
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

    await taskRepository.clearTasks();
    resetNodes();

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