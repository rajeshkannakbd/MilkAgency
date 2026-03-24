const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  customerId: {type: mongoose.Schema.Types.ObjectId, ref:"Customer", required:true},
  date:{type:Date, default:Date.now},
  delivered:{type:Boolean, default:false},
  ownerId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
},{timestamps: true})

module.exports = mongoose.model("Delivery",DeliverySchema);