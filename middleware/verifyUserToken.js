const User=require('../models/User');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secretKey=process.env.WhatIsYourName;
const verifyUserToken= async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({error:" Wrong Email or Password"});
    }

    try{
             const decoded=jwt.verify(token,secretKey);

            const user=await User.findById(decoded.userId);
            if(!user){
                   return res.status(404).json({error:"User Not Found"});

            }

            req.userId=user._id

            next();
   }catch(err){
          console.error(err);
          return res.status(500).json({error:"Invalid Token"});
    }
}

module.exports=verifyUserToken;