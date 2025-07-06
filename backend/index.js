require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToMongoDB = require("./src/config/db");
const animeRoutes = require("./src/routes/animeRoutes");
const youtubeRoutes = require("./src/routes/youtubeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/", youtubeRoutes);
app.use("/anime", animeRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectToMongoDB();
});
