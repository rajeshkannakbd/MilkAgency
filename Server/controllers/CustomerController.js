const express = require("express");
const Customer = require("../models/Customer");

const Addcustomer = async(req,res)=>{
  try {
    const {name, phone, address, product, pricePerUnit, quantity} = req.body;
    if(!name || !phone || !address || !product || !pricePerUnit || !quantity){
      return res.status(404).json({success:false, message:"All Fields Are Required"});
    }
    const existing = await Customer.findOne({phone})
    if(existing){
      return res.status(404).json({success:false, message:"Customer Already Found"})
    }
    const customer = await Customer.create({name, phone, address, product, quantity, pricePerUnit, ownerId:req.user.id});
    res.status(200).json({success:true, message:"Customer Created Sucessfully", data: customer})
  } catch (error) {
    res.status(500).json({success:false, message:"Internal server error"})
  }
}

const CustomerList = async(req,res)=>{
    try {
      const ownerId = req.user.id;
      const customers = await Customer.find({ownerId});
      res.status(200).json({success:true, data: customers,message:"Customer Are Found"})
    } catch (error) {
      res.status(500).json({success:false, message:"Internal server error"})
    }
}

const singleCustomer = async(req,res)=>{
    try {
      const customer = await Customer.find({_id: req.user._id, ownerId: req.params._id});
      res.status(200).json({success:true, data: customer,message:"Customer Are Found"})
    } catch (error) {
      res.status(500).json({success:false, message:"Internal server error"})
    }
}

const DeleteCustomer = async(req,res)=>{
    try {
      const customer = await Customer.deleteOne({_id: req.user._id, ownerId: req.params._id});
      res.status(200).json({success:true, data: customer,message:"Customer Are Found"})
    } catch (error) {
      res.status(500).json({success:false, message:"Internal server error"})
    }
}

module.exports = {DeleteCustomer, singleCustomer, CustomerList, Addcustomer};

