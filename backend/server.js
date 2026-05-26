require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();

/* ---------------- ALLOWED ORIGINS ---------------- */
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- DATABASE ---------------- */
connectDB();

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

/* ---------------- ROUTES ---------------- */
const taskRoutes = require("./routes/taskRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");
const nodeRoutes = require("./routes/nodeRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/nodes", nodeRoutes);

/* ---------------- SOCKET SETUP ---------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});