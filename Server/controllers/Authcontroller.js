const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try {
      const {name, email, password, businessName} = req.body;
      if(!name || !email || !password || !businessName){
        return res.status(404).json({success:false,message:"All Fields Are Required"}) 
      }
      const existing = await User.findOne({email});
      if(existing){
         return res.status(404).json({success:false,message:"User Already found"}) 
      }
      const hashpass = await bcrypt.hash(password,10)
      const user = await User.create({name, email, password:hashpass, businessName});
      res.status(200).json({success:true, data:{id:user._id, name:user.name, email:user.email, businessNmae:user.businessName}, message:"User Created Sucessfully"})
    } catch (error) {
      res.status(500).json({success:false,message:"Internal server error"})
    }
}

const login = async(req,res)=>{
    try {
      const {email, password} = req.body;
      if(!email || !password){
        return res.status(400).json({success:false,message:"All Fields Are Required"}) 
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(404).json({success:false,message:"User Not Found"}) 
      }
      const isMatching = await bcrypt.compare(password,user.password);
      if(!isMatching){
        return res.status(401).json({success:false,message:"Wrong Password"})
      }
      const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, {expiresIn:"3d"})
       res.status(200).json({success:true, message:"Login Sucessfull", token})
    } catch (error) {
      res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

const getUser = async(req,res)=>{
   try {
     const user = await User.findOne(req.user.id).select("-password")
     if(!user){
        return res.status(404).json({success:false,message:"User Not Found"})
     }
      res.status(200).json({success:true, data: user})
} catch (error) {
  res.status(500).json({success:false,message:"Internal server error"})
}
}


module.exports ={register, login, getUser};