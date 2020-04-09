const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name_customer: String,
  desc_customer: String
});

module.exports = mongoose.model("customerModel", customerSchema, "data");
