const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectMemoryDB = async () => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create({
      instance: {
        port: Number(process.env.MEMORY_MONGO_PORT || 29117),
      },
    });
  }
  const memoryUri = memoryServer.getUri();
  const conn = await mongoose.connect(memoryUri);
  console.log(`MongoDB Connected (memory): ${conn.connection.host}`);
  return conn;
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If no URI is provided (or localhost URI is provided), use in-memory MongoDB for reliable local runs.
    if (!uri || uri.includes("127.0.0.1") || uri.includes("localhost")) {
      console.log("Using in-memory MongoDB for local development.");
      await connectMemoryDB();
      return;
    }

    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (primaryError) {
      console.warn(`Primary MongoDB connection failed: ${primaryError.message}`);
      console.log("Falling back to in-memory MongoDB.");
      await connectMemoryDB();
    }

  } catch (error) {
    process.env.FORCE_MEMORY_STORE = "1";
    console.error(`MongoDB connection failed, continuing in API memory mode: ${error.message}`);
  }
};

module.exports = connectDB;