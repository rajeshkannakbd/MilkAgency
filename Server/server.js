const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")
const dbconfig = require("./config/db.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/v1/auth", require("./routes/authRoute.js"));
app.use("/v1/farmer", require("./routes/farmerRoutes"));
app.use("/v1/buyer", require("./routes/buyerRoutes"));
app.use("/v1/purchase", require("./routes/purchaseRoutes"));
app.use("/v1/sale", require("./routes/saleRoutes"));
app.use("/v1/profit", require("./routes/profitRoutes"));



const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`server running on ${port}`)})