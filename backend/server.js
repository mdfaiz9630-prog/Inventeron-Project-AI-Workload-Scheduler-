require("dotenv").config(); // MUST be first

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(express.json());

// connect MongoDB
connectDB();

// test root route
app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("API Working 🚀");
});

// routes
const taskRoutes = require("./routes/taskRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/scheduler", schedulerRoutes);

// port
const PORT = process.env.PORT || 8000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});