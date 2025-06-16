require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {
  trendingAnimeQuery,
  animeQuery,
  animeGenreQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
} = require("./src/utils/query");
const httpStatus = require("http-status-codes").StatusCodes;
const { getNextSeasonAndYear } = require("./src/utils/helper.js") 
const { season, year } = getNextSeasonAndYear();
const app = express();

app.use(cors());

const API_URL = process.env.API_URL;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/anime", async (req, res) => {
  const genre = req.query.genre;

  if (genre) {
    try {
      animeGenreQuery.variables.genre = genre;
      const response = await axios.post(API_URL, animeGenreQuery, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const animeList = response.data.data.Page.media;
      return res.json(animeList);
    } catch (error) {
      console.error("Error fetching anime:", error.message);
      res.status(500).json({ error: "Failed to fetch anime from AniList" });
    }
  } else {
    try {
      const response = await axios.post(API_URL, animeQuery, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const animeList = response.data.data.Page.media;
      return res.json(animeList);
    } catch (error) {
      console.error("Error fetching anime:", error.message);
      res.status(500).json({ error: "Failed to fetch anime from AniList" });
    }
  }
});

app.get("/trending", async (req, res) => {
  const page = req.query.page || 1;
  try {
    trendingAnimeQuery.variables.page = page;
    const response = await axios.post(API_URL, trendingAnimeQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const trendingList = response.data.data.Page.media;
    return res.json(trendingList);
  } catch (error) {
    console.error("Error fetching trending anime:", error.message);
    res.status(500).json({ error: "Failed to fetch trending anime" });
  }
});

app.get("/upcoming", async (req, res) => {
  try {
    upcomingAnimeQuery.variables.season = season;
    upcomingAnimeQuery.variables.seasonYear = year;
    const response = await axios.post(API_URL, upcomingAnimeQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const upcomingAnimeList = response.data.data.Page.media;
    return res.json(upcomingAnimeList);
  } catch (error) {
    console.error("Error fetching upcoming anime:", error.message);
    res.status(500).json({ error: "Failed to fetch upcoming anime" });
  }
});

app.get("/latest", async (req, res) => {
  try {
    const response = await axios.post(API_URL, latestAnimeQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const filtered = response.data.data.Page.media.filter(
      (anime) =>
        anime.startDate &&
        anime.startDate.year &&
        anime.startDate.month &&
        anime.startDate.day
    );

    // const filteredAnime = filtered.filter(({ startDate }) => {
    //   if (!startDate?.year || !startDate?.month || !startDate?.day) return false;
    //   const date = new Date(startDate.year, startDate.month, startDate.day);
    //   return date <= new Date();
    // })

    // return res.json(filteredAnime);
    return res.json(filtered);
  } catch (error) {
    console.error("Error fetching latest anime:", error.message);
    res.status(500).json({ error: "Failed to fetch latest anime" });
  }
});

app.get("/search", async (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Search query is required" });
  }

  animeSearchQuery.variables.search = searchQuery;

  try {
    const response = await axios.post(API_URL, animeSearchQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const searchResults = response.data.data.Page.media;
    return res.json(searchResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
