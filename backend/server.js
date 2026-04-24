require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

// test root route
app.get("/", (req,res)=>{
 res.send("API Working 🚀");
});

// routes
const taskRoutes = require("./routes/taskRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/scheduler", schedulerRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
});