const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function searchTMDBAnime(title) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
        include_adult: false,
      },
    });

    const results = response.data.results;
    if (!results || results.length === 0) return null;

    const anime = results[0]; // take the first match
    return anime.backdrop_path
      ? `https://image.tmdb.org/t/p/original${anime.backdrop_path}`
      : null;
  } catch (err) {
    console.error("TMDB fetch error:", err.message);
    return null;
  }
}

module.exports = { searchTMDBAnime };
