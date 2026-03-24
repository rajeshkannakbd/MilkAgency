const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")
const dbconfig = require("./config/db.js");
const cors = require("cors");
const AuthRoutes = require("./routes/AuthRoutes.js")
const CustomerRoutes = require("./routes/CustomerRoutes.js")
const {AuthMiddleware} = require("./middleware/authMiddleware.js");
const BillingRoutes = require("./routes/BillingRoutes.js")
const deliveryRoutes = require("./routes/DeliveryRoutes.js")

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://deliverysaas-frontend.onrender.com/", 
  credentials: true
}));
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/auth/v1", AuthRoutes);
app.use("/v1/customer", AuthMiddleware, CustomerRoutes);
app.use("/v1", AuthMiddleware, deliveryRoutes)
app.use("/v1/billing", AuthMiddleware, BillingRoutes)



const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`server running on ${port}`)})