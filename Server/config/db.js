const mongoose = require("mongoose");

const dbconfig = async()=>{
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongodb Connected");
}

module.exports = dbconfig;