const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
  },
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("Sale", saleSchema);