const Customer = require("../models/Customer");
const Delivery = require("../models/Delivery");

const getMonthlyBilling = async(req,res)=>{
  try {
    const userId = req.user.id
    const customers = await Customer.find({ownerId: userId});
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23,59,59,999);
    const result=[];
    for(const customer of customers){
      const deliveredDays = await Delivery.countDocuments({
        customerId: customer._id,
        ownerId: userId,
        date: { $gte: start, $lte: end }
      });
      const total = customer.quantity * customer.pricePerUnit * deliveredDays;
      result.push({
        customer: customer.name,
        deliveredDays,
        total
      });
    }
    res.status(200).json({success: true, data: result})

  } catch (error) {
    res.status(500).json({success:false, message:"Internal Server Error"})
  }
}

module.exports = {getMonthlyBilling};