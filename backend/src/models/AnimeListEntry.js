const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeListEntrySchema = new Schema({
  animeId: { type: String, required: true },
  coverImage: { type: String },
  title: { type: String },
  format: { type: String },
  episodes: { type: Number },
  duration: { type: Number },
});

module.exports = mongoose.model("AnimeListEntry", animeListEntrySchema);
