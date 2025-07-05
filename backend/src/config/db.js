const mongoose = require("mongoose");

// Connect to MongoDB
const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
};

module.exports = connectToMongoDB;