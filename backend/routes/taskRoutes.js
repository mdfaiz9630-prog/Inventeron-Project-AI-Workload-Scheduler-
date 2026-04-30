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

router.delete("/:id", deleteTask);
router.delete("/clear/all", clearTasks);

module.exports = router;