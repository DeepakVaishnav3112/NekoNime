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
  const page = parseInt(req.query.page) || 1;

  try {
    const genre = req.query.genre;
    const query = genre
      ? { ...animeGenreQuery, variables: { genre, page } }
      : animeQuery;

    const response = await postRequest(query);
    const pageData = response.data.data.Page;
    const animeList = pageData.media;
    const pageInfo = pageData.pageInfo;

    res.json({
      animeList,
      pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTrendingAnime = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `trending-${page}`;

  try {
    if (page === 1) {
      const cached = getCache(cacheKey);
      if (cached) return res.json(cached);
    }

    trendingAnimeQuery.variables.page = page;
    const response = await postRequest(trendingAnimeQuery);
    const pageData = response.data.data.Page;
    const animeList = pageData.media;
    const pageInfo = pageData.pageInfo;

    if (page === 1)
      setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

    res.json({
      animeList,
      pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUpcomingAnime = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `upcoming-${page}`;

  try {
    if (page === 1) {
      const cached = getCache(cacheKey);
      if (cached) return res.json(cached);
    }

    upcomingAnimeQuery.variables = { season, seasonYear: year, page };
    const response = await postRequest(upcomingAnimeQuery);
    const pageData = response.data.data.Page;
    const animeList = pageData.media;
    const pageInfo = pageData.pageInfo;

    if (page === 1)
      setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

    res.json({
      animeList,
      pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLatestAnime = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `latest-${page}`;

  try {
    if (page === 1) {
      const cached = getCache(cacheKey);
      if (cached) return res.json(cached);
    }

    latestAnimeQuery.variables.page = page;
    const response = await postRequest(latestAnimeQuery);
    const pageData = response.data.data.Page;
    const animeList = pageData.media.filter(
      (a) => a.startDate?.year && a.startDate?.month && a.startDate.day
    );
    const pageInfo = pageData.pageInfo;

    if (page === 1)
      setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

    res.json({
      animeList,
      pageInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchAnime = async (req, res, next) => {
  const search = req.query.q;
  const page = parseInt(req.query.page) || 1;

  if (!search) return res.status(400).json({ error: "Missing search query" });

  try {
    animeSearchQuery.variables.search = search;
    animeSearchQuery.variables.page = page;
    const response = await postRequest(animeSearchQuery);
    const pageData = response.data.data.Page;
    const animeList = pageData.media;
    const pageInfo = pageData.pageInfo;

    res.json({
      animeList,
      pageInfo,
    });
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
    animeCharacterQuery.variables.page = parseInt(req.query.page) || 1;

    const response = await postRequest(animeCharacterQuery);

    const pageInfo = response.data.data.Media.characters.pageInfo;
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

    res.json({ characters, pageInfo });
  } catch (err) {
    next(err);
  }
};

exports.getAnimeStaff = async (req, res, next) => {
  try {
    animeStaffQuery.variables.page = parseInt(req.query.page) || 1;

    animeStaffQuery.variables.id = parseInt(req.params.id);
    const response = await postRequest(animeStaffQuery);

    const pageInfo = response.data.data.Media.staff.pageInfo;
    const staff = response.data.data.Media.staff.edges.map((edge) => ({
      role: edge.role,
      staff: edge.node,
    }));
    res.json({ staff, pageInfo });
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
