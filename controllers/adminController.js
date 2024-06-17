const Admin=require('../models/Admin');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');

dotenv.config();
const secertKey=process.env.WhatIsYourName;


const adminRegister=async(req,res)=>{

    const {username,email,password} =req.body;
    try{
        const adminEmail=await Admin.findOne({email});
        if(adminEmail){
            return res.status(400).json("Email Already Registered");

        }


        const hashedPass=await bcrypt.hash(password,10);
        const newAdmin=new Admin({username,email,password:hashedPass});
        await newAdmin.save();

        res.status(201).json({message:"Admin Created"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }



}

const adminLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const admin =await Admin.findOne({email});
        if(!admin || !(await bcrypt.compare(password,admin.password))){
            return res.status(401).json({error:"Invalid Admin"});
        }

        const token =jwt.sign({adminId:admin._id},secertKey);
        res.status(200).json({message:"Login Successful",token,email,admin});
        console.log(email);
    }catch(err){
        console.log(err);
    }

}


module.exports={adminRegister,adminLogin};