const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks
} = require("../controllers/taskController");

// CREATE TASK
router.post("/", createTask);

// GET ALL TASKS
router.get("/", getTasks);

module.exports = router;