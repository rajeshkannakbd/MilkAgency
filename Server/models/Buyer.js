const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: String,
  type: String, // tea shop / industry
  price: Number, // selling price per litre
});

module.exports = mongoose.model("Buyer", buyerSchema);