const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../middlewares/verifyToken");
const asyncHandler = require("express-async-handler");

router.get("/anime", asyncHandler(commentController.getAnimeComments));
router.get("/replies", asyncHandler(commentController.getCommentReplies));
router.post(
  "/add",
  verifyToken,
  asyncHandler(commentController.addUserComment)
);
router.post(
  "/delete",
  verifyToken,
  asyncHandler(commentController.deleteComment)
);

module.exports = router;
