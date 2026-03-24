const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
  },
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("Purchase", purchaseSchema);