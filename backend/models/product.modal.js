const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  category_id: { type: mongoose.Types.ObjectId, ref: "Category" },
  description: { type: String, required: true },
  voting: { type: Number, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  num_in_Stock: { type: Number, required: true },
  offer: { type: Number, required: true },
  image: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
