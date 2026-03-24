const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type: String,required: true},
    email:{type: String,required: true,unique: true},
    password:{type: String,required: true},
    businessName:{type: String,required: true},
    role:{type: String,enum:["owner","admin"],default:"owner"}

},{timestamps: true})

module.exports = mongoose.model("User",userSchema);