const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
const Token=require('../models/token');
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");
// var nodemailer = require('nodemailer');


dotenv.config();
const secertKey=process.env.WhatIsYourName;


const userRegister=async(req,res)=>{

    const {name,email,phonenumber,password,role} =req.body;
    try{
        // const userEmail=await User.findOne({email});
        // if(userEmail){
        //     return res.status(400).json("Email Already Registered");

        // }


        const hashedPass=await bcrypt.hash(password,10);
        const newUser=new User({name,email,phonenumber,password:hashedPass,role});
        await newUser.save();

        const token=await new Token({
            userId:newUser._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save();

        const url=`${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
        await sendEmail(newUser.email,"Verify Email",url);

        res.status(201).json({message:"An Email sent to your account"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }



}

const emailSend=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.params.id});
       
        if(!user){
            return res.status(400).send({messge:"invalid link"});
        }
        await User.findByIdAndUpdate(user._id,{
            verified:true});
            
    // const token=await Token.findOne({
    //         userId:user._id,
    //         token:req.params.token
    //  });
    //     if(!token)
    //         return res.status(400).send({messge:"invalid link"});
   
    //    await User.findByIdAndUpdate({_id:user._id,verified:true});
           
    //     await token.remove()
        console.log("----------")
        res.status(200).send({messge:"Email verified successfully"});
    }catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
}



const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user =await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error:"Your Email is not Registered"});
        }

        if(!user.verified){
            let token=await Token.findOne({userId:user._id});
            if(!token){
                 token=await new Token({
                    userId:user._id,
                    token:crypto.randomBytes(32).toString("hex")
                }).save();
        
                const url=`${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
                await sendEmail(user.email,"verify Email",url);
            }
            return res.status(200).json({error:"an email sent to your account please check"});
        }

        const token =jwt.sign({userId:user._id},secertKey);
        res.status(200).json({message:"Login Successful",token,email,user});
        console.log(email);
    }catch(err){
        console.log(err);
    }

}



const forgotPass=async(req,res)=>{
    // const {email}=req.body;
    // console.log(email);
    // const user=await User.findOne({email:email});
  
    //     if(!user){
    //         return res.send({status:"user not existed"});
    //     }

    //     const token =jwt.sign({userId:user._id},secertKey);
        const { email } = req.body;
        console.log(email);
        try{

        
        const user =await User.findOne({email});
        if(!user){
            return res.send({message:"user not registered"})
        }
        console.log(email);
        const token =jwt.sign({userId:user._id},secertKey,{expiresIn:"1d"});

        const url=`${process.env.BASE_URL}reset-password/${user._id}/${token}`;
        await sendEmail(user.email,"Reset Password",url);

        res.status(201).json({message:"An Email sent to your account"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }

   

}

// const resetPass=async(req,res)=>{
//     // const {email}=req.body;
//     // console.log(email);
//     // const user=await User.findOne({email:email});
  
//     //     if(!user){
//     //         return res.send({status:"user not existed"});
//     //     }

//     //     const token =jwt.sign({userId:user._id},secertKey);
//         const { id,token } = req.params;
//         const {password}=req.body;
//         console.log(email);
//         try{

        
//         const user =await User.findOne({email});
//         if(!user){
//             return res.send({message:"user not registered"})
//         }
//         console.log(email);
//         jwt.verify(token,secertKey,(err,decoded)=>{
//             if(err){
//                 res.json({message:"Error with token"})
//             }else{
//                 console.log("-----------");
//                 bcrypt.hash(password,10).then(
//                     hash=>{
//                         // User.findByIdAndUpdate({_id:id},{password:hash})
//                          User.findByIdAndUpdate(user._id,
//                             {password:hash})
//                         .then(u=>res.send({message:"Passwor updated successfully"}))
//                         .catch(err=>res.send(err))
//                     }
//                 )
//             }

//         }

//         )

//         // const url=`${process.env.BASE_URL}reset-password/${user._id}/${token}`;
//         // await sendEmail(user.email,"Reset Password",url);

//         res.status(201).json({message:"An Email sent to your account"});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:"Internal Server Error"});
//     }

   

// }
const resetPass = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(id);
    try {
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: "User not registered" });
      }

      // Verify the token
      jwt.verify(token, secertKey, async (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: "Error with token" });
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
  
        res.send({ message: "Password updated successfully" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


module.exports={userRegister,userLogin,emailSend,forgotPass,resetPass};