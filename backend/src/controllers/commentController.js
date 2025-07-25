const Comment = require("../models/Comment");
const User = require("../models/User");
const AnimeEntry = require("../models/AnimeEntry");

// Get comments for an anime
exports.getAnimeComments = async (req, res) => {
  const { animeId, page = 1, limit = 5 } = req.query;

  const animeEntry = await AnimeEntry.findOne({ animeId }).populate({
    path: "comments",
    match: { isDeleted: false },
    options: {
      sort: { createdAt: -1 },
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    },
    populate: {
      path: "userId",
      select: "username profilePicture",
    },
  });

  if (!animeEntry) {
    const newEntry = await AnimeEntry.create({ animeId });
    return res
      .status(201)
      .json({ message: "Anime entry created.", comments: [] });
  }

  const totalComments = await Comment.countDocuments({
    animeId,
    isDeleted: false,
  });

  res.status(200).json({
    message: "Comments fetched.",
    comments: animeEntry.comments,
    total: totalComments,
    page: Number(page),
    hasMore: page * limit < totalComments,
  });
};

// Get comment replies
exports.getCommentReplies = async (req, res) => {
  const { commentId, limit = 3 } = req.query;

  const comment = await Comment.findById(commentId).populate({
    path: "replies",
    options: {
      sort: { createdAt: 1 },
      limit: parseInt(limit),
    },
    populate: {
      path: "userId",
      select: "username profilePicture",
    },
  });

  if (!comment) return res.status(404).json({ message: "Comment not found!" });

  res
    .status(200)
    .json({ message: "Replies fetched", replies: comment.replies });
};

// Add comment
exports.addUserComment = async (req, res) => {
  const { animeId, comment } = req.body;
  const userId = req.user.id;

  if (!animeId || !comment) {
    return res.status(400).json({ message: "animeId or comment is missing!" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found!" });

  const animeEntry = await AnimeEntry.findOne({ animeId });
  if (!animeEntry) {
    animeEntry = await AnimeEntry.create({
      animeId,
      comments: [],
    });
  }

  const newComment = await Comment.create({
    userId,
    animeId,
    comment,
  });

  user.comments.push(newComment._id);
  await user.save();
  animeEntry.comments.push(newComment._id);
  await animeEntry.save();

  res.status(200).json({ message: "Comment added succesfully!", newComment });
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  if (comment.userId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You can only delete your own comments!" });
  }

  comment.isDeleted = true;
  await comment.save();

  res.status(200).json({ message: "Comment deleted successfully!" });
};
