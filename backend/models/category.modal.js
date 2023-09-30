const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Category", CategorySchema);
