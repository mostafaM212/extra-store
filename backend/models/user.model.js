const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  carts: { type: Number, default: 0 },
  created_at: { type: Date, required: true, default: Date.now },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
