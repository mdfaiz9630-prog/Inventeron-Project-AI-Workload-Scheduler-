const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks
} = require("../controllers/taskController");

// CREATE task
router.post("/", createTask);

// GET tasks
router.get("/", getTasks);

module.exports = router;