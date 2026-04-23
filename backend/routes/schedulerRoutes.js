const express = require("express");
const router = express.Router();

const { runScheduler } = require("../controllers/schedulerController");

router.get("/", runScheduler);

module.exports = router;