const Admin=require('../models/Admin');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secretKey=process.env.WhatIsYourName;
const verifyAdminToken= async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({error:" Wrong Email or Password"});
    }

    try{
             const decoded=jwt.verify(token,secretKey);

            const admin=await Admin.findById(decoded.adminId);
            if(!admin){
                   return res.status(404).json({error:"admin Not Found"});

            }

            req.adminId=admin._id

            next();
   }catch(err){
          console.error(err);
          return res.status(500).json({error:"Invalid Token"});
    }
}

module.exports=verifyAdminToken;