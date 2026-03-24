const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  price: Number, // price per litre
});

module.exports = mongoose.model("Farmer", farmerSchema);