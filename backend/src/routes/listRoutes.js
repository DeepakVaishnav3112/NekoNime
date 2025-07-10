const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const verifyToken = require("../middlewares/verifyToken");
const listController = require("../controllers/listController");

router.post(
  "/add-to-default",
  verifyToken,
  asyncHandler(listController.addToDefaultList)
);
router.get(
  "/status/:animeId",
  verifyToken,
  asyncHandler(listController.checkDefaultListStatus)
);
router.post(
  "/remove-from-default",
  verifyToken,
  asyncHandler(listController.removeFromDefaultList)
);
router.get(
  "/default/:listTitle",
  verifyToken,
  asyncHandler(listController.getDefaultListEntries)
);

module.exports = router;
