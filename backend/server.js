require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
res.send("API Working 🚀");
});


// routes
const taskRoutes = require("./routes/taskRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");
const nodeRoutes = require("./routes/nodeRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/nodes", nodeRoutes);



/* socket server */
const server = http.createServer(app);

const io = new Server(server,{
cors:{
origin:"*"
}
});

global.io = io;


io.on("connection",(socket)=>{

console.log("Client connected");

socket.on("disconnect",()=>{
console.log("Client disconnected");
});

});


const PORT = process.env.PORT || 8000;


server.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});