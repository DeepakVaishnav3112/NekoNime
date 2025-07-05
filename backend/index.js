require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToMongoDB = require("./src/config/db");
const animeRoutes = require("./src/routes/animeRoutes");
const youtubeRoutes = require("./src/routes/youtubeRoutes");
const authRoutes = require("./src/routes/authRoutes")
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/", youtubeRoutes);
app.use("/anime", animeRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectToMongoDB();
});
