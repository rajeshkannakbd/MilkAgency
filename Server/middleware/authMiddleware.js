const express = require("express");
const jwt = require("jsonwebtoken");

const AuthMiddleware = (req,res,next)=>{
  const header = req.headers.authorization;
  if(!header){
    return res.status(403).json({success:false,message:"Token Required"});
  }
  const token = header.split(" ")[1];
  if(!token){
     return res.status(403).json({success:false,message:"Token not found"});
  }
  try{
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  req.user = decoded ;
  next();
  }catch(err){
   res.status(500).json({success:false,message:"Internal Server Error"});
  }
}

module.exports = { AuthMiddleware }