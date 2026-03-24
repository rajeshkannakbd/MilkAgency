const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    phone:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    product:{type:String, enum:["milk", "newspaper", "water", "other"], required:true},
    quantity:{type:Number, required:true},
    pricePerUnit:{type:Number, required:true},
    ownerId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}


},{timestamps:true})

module.exports = mongoose.model("Customer",customerSchema);