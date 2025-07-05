const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  animeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  coverImage: { type: String },
  bannerImage: { type: String },
  format: { type: String },
  genres: [{ type: String }],
  status: { type: String },
  episodes: { type: Number },
  duration: { type: Number },
});

module.exports = mongoose.model("Anime", animeSchema);