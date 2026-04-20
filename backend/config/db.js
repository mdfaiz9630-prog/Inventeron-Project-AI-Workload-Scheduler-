const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mdfaiz9630_db_user:eLd2z1nd0ecuxnjd@cluster0.7m3lrub.mongodb.net/ai_scheduler?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;