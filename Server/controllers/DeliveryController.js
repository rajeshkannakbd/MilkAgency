const express = require("express");
const Delivery = require("../models/Delivery");


const AddDelivery = async(req,res)=>{
  try {
    const {customerId} = req.body;
    if(!customerId){
      return res.status(400).json({success: false, message:"Customer Not Selected"});
    }
    const UserId = req.user.id;
    const today = new Date();
    const start = new Date(today);
    start.setHours(0,0,0,0)
    const end = new Date(today);
    end.setHours(23,59,59,999)
    const existing = await Delivery.findOne({customerId, ownerId: UserId, date:{$gte: start, $lte: end}});
    if(existing){
      return res.status(400).json({success: false, message:"Deliver Already Marked For Today"})
    }
    const delivery = await Delivery.create({customerId, ownerId:UserId, delivered: true});
    res.status(201).json({success: true, message:"Delivery marked SucessFully", data: delivery})
  } catch (error) { 
    res.status(500).json({success:false, message:"Internal Server Error"})
  }
}
module.exports = {AddDelivery}