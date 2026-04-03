const express = require("express");
const connectDB = require("./config/db");

console.log("Step 1: imports loaded");

const app = express();

console.log("Step 2: app created");

app.use(express.json());

connectDB();

console.log("Step 3: DB function called");

// Keep routes commented for now until we fix route files
// const taskRoutes = require("./routes/taskRoutes");
// const schedulerRoutes = require("./routes/schedulerRoutes");
// app.use("/api/tasks", taskRoutes);
// app.use("/api/scheduler", schedulerRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});