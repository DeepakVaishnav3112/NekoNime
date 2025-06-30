const axios = require("axios");
const { getCache, setCache } = require("../services/cacheService.js");
const YoutubeCache = require("../models/YoutubeCache.js");

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

exports.searchYoutube = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter." });
  }

  console.log(`🔍 Searching YouTube for: ${query}`);

  try {
    // Check MongoDB cache first
    const cached = await YoutubeCache.findOne({
      query: query.trim().toLowerCase(),
    });

    if (cached) {
      console.log(`✅ Cache hit for query: ${query}`, cached);
      return res.json(cached.noResult ? null : cached.videoData);
    }

    // Not in DB, fetch from YouTube
    const ytRes = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet",
        q: query,
        key: YOUTUBE_API_KEY,
        maxResults: 1,
        type: "video",
      },
    });

    if (!ytRes.data.items || ytRes.data.items.length === 0) {
      console.warn(`No YouTube result found for: ${query}`);
    }

    console.log("🎬 YouTube response for", query, ytRes.data.items);
    const video = ytRes.data?.items?.[0] || null;

    // Save to MongoDB even if it's null
    await YoutubeCache.create({
      query: query.trim().toLowerCase(),
      videoData: video,
      noResult: video ? false : true,
    }).then(() => console.log(`✅ Saved to MongoDB: ${query}`));

    res.json(video);
  } catch (error) {
    console.error(`YouTube API error for query "${query}":`, error.response?.data || error.message);
    res.status(500).json({ error: "YouTube fetch failed.", details: error.message });

    // console.error(`YouTube API error for "${query}":`, error.message);
    // res
    //   .status(500)
    //   .json({ error: "YouTube fetch failed", details: error.message });
  }
};
