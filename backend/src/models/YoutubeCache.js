const mongoose = require("mongoose");

const YoutubeCacheSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true },
  videoData: { type: Object, default: null }, // ✅ store youtube video data
  noResult: { type: Boolean, default: false }, // ✅ store if no result found
}, { timestamps: true });

module.exports = mongoose.model("YoutubeCache", YoutubeCacheSchema);