const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  clearTasks
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);

router.delete("/clear/all", clearTasks);
router.delete("/:id", deleteTask);

module.exports = router;