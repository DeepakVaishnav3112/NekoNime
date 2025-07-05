const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
  reply: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  editedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reply", replySchema);
