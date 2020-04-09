const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  dp_url: String,
  name: String,
  email: String,
  phone: String,
  password: String,
  followers: Number,
});

module.exports = mongoose.model("accountModel", accountSchema, "user");
