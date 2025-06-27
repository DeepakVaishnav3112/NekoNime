const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");

router.get("/", animeController.getAnime);
router.get("/trending", animeController.getTrendingAnime);
router.get("/upcoming", animeController.getUpcomingAnime);
router.get("/latest", animeController.getLatestAnime);
router.get("/search", animeController.searchAnime);
router.get("/:id", animeController.getAnimeById);
router.get("/:id/characters", animeController.getAnimeCharacters);
router.get("/:id/staff", animeController.getAnimeStaff);
router.get("/:id/moreinfo", animeController.getMoreInfo);

module.exports = router;