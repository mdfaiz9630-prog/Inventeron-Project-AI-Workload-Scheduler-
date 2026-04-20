const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Scheduler route hit");

  res.json({
    message: "Scheduler working",
    schedule: []
  });
});

module.exports = router;