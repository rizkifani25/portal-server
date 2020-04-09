const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  content: String,
  like: Number
});

module.exports = mongoose.model("postModel", postSchema, "post");
