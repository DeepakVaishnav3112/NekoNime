const axios = require("axios");
const {
  animeGenreQuery,
  animeQuery,
  trendingAnimeQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
  animeDetailsQuery,
  animeCharacterQuery,
  animeStaffQuery,
  animeMoreInfoQuery,
} = require("../utils/query");
const { getNextSeasonAndYear } = require("../utils/helper");
const { getCache, setCache } = require("../services/cacheService");

const API_URL = process.env.API_URL;
const { season, year } = getNextSeasonAndYear();

const postRequest = async (query) => {
  return await axios.post(API_URL, query, {
    headers: { "Content-Type": "application/json" },
  });
};

exports.getAnime = async (req, res, next) => {
  try {
    const genre = req.query.genre;
    const query = genre
      ? { ...animeGenreQuery, variables: { genre } }
      : animeQuery;

    const response = await postRequest(query);
    res.json(response.data.data.Page.media);
  } catch (err) {
    next(err);
  }
};

exports.getTrendingAnime = async (req, res, next) => {
  const page = req.query.page || 1;
  const cacheKey = `trending-${page}`;

  try {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    trendingAnimeQuery.variables.page = page;
    const response = await postRequest(trendingAnimeQuery);
    const data = response.data.data.Page.media;

    setCache(cacheKey, data);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getUpcomingAnime = async (req, res, next) => {
  const cacheKey = `upcoming-${season}-${year}`;

  try {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    upcomingAnimeQuery.variables = { season, seasonYear: year };
    const response = await postRequest(upcomingAnimeQuery);
    const data = response.data.data.Page.media;

    setCache(cacheKey, data);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getLatestAnime = async (req, res, next) => {
  const cacheKey = `latest`;

  try {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const response = await postRequest(latestAnimeQuery);
    const data = response.data.data.Page.media.filter(
      (a) => a.startDate?.year && a.startDate?.month && a.startDate.day
    );

    setCache(cacheKey, data);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.searchAnime = async (req, res, next) => {
  const search = req.query.q;
  if (!search) return res.status(400).json({ error: "Missing search query" });

  try {
    animeSearchQuery.variables.search = search;
    const response = await postRequest(animeSearchQuery);
    res.json(response.data.data.Page.media);
  } catch (err) {
    next(err);
  }
};

exports.getAnimeById = async (req, res, next) => {
  try {
    animeDetailsQuery.variables.id = parseInt(req.params.id);
    const response = await postRequest(animeDetailsQuery);
    res.json(response.data.data.Media);
  } catch (err) {
    next(err);
  }
};

exports.getAnimeCharacters = async (req, res, next) => {
  try {
    animeCharacterQuery.variables.id = parseInt(req.params.id);
    const response = await postRequest(animeCharacterQuery);

    const characters = response.data.data.Media.characters.edges.map(
      (edge) => ({
        role: edge.role,
        character: edge.node,
        voiceActors: {
          japanese: edge?.voiceActors?.filter(
            (va) => va.language === "JAPANESE"
          ),
          english: edge.voiceActors?.filter((va) => va.language === "ENGLISH"),
        },
      })
    );

    res.json(characters);
  } catch (err) {
    next(err);
  }
};

exports.getAnimeStaff = async (req, res, next) => {
  try {
    animeStaffQuery.variables.id = parseInt(req.params.id);
    const response = await postRequest(animeStaffQuery);
    res.json(response.data.data.Media.staff.edges);
  } catch (err) {
    next(err);
  }
};

exports.getMoreInfo = async (req, res, next) => {
  try {
    animeMoreInfoQuery.variables.id = parseInt(req.params.id);
    const response = await postRequest(animeMoreInfoQuery);
    res.json(response.data.data.Media);
  } catch (err) {
    next(err);
  }
};
