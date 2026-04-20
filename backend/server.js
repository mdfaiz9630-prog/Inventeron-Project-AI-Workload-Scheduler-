const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("WORKING");
});

app.get("/api/scheduler", (req, res) => {
  console.log("Scheduler hit");
  res.json({ message: "OK" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});