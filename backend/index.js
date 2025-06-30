require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const animeRoutes = require("./src/routes/animeRoutes");
const youtubeRoutes = require("./src/routes/youtubeRoutes");
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => onsole.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/anime", animeRoutes);
app.use("/", youtubeRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
