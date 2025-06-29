require("dotenv").config();
const express = require("express");
const cors = require("cors");
const animeRoutes = require("./src/routes/animeRoutes");
const { errorHandler } = require("./src/middlewares/errorHandler");
const axios = require("axios");
const { setCache, getCache } = require("./src/services/cacheService");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/anime", animeRoutes);
app.use(errorHandler);

app.get("/youtube-search", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter." });
  }

  const cacheKey = `youtube-search-${query}`;

  try {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const ytRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: query,
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
        type: "video",
      },
    });

    if (!ytRes.data.items || ytRes.data.items.length === 0) {
      console.warn(`No YouTube result found for: ${query}`);
      return res.status(200).json(null); // ✅ return null instead of 500
    }

    setCache(cacheKey, ytRes.data.items[0], 24 * 60 * 60 * 1000); // ✅ cache for 24 hours
    res.json(ytRes.data.items[0]);
  } catch (error) {
    console.error(`YouTube API error for query "${query}":`, error.response?.data || error.message);
    res.status(500).json({ error: "YouTube fetch failed.", details: error.message });
    // console.error(`YouTube API error for query "${query}":`, error.message);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
