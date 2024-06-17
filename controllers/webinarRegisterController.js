
// const Author=require('../models/Author');
const express= require('express');
const app=express();
const multer=require('multer');
// const Event = require('../models/Event');
const WebinarRegistration = require('../models/WebinarRegistration');
// const Product = require('../models/Product');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null,  Date.now() + '-'+file.originalname);
    }
  });
  
  // Initialize Multer upload
  const upload = multer({
    storage: storage,
    // 1 MB file size limit
  }); // 'image' is the name of the field in the form
  
  // Serve static files from the 'uploads' directory
//   app.use(express.static('uploads')); 


const addWebinar=async(req,res)=>{
   

    try{
        const { name, email, phonenumber, event } = req.body;

        if (!name || !email || !phonenumber || !event) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // const image=req.file?req.file.filename:undefined;
    // const admin=await Admin.findById(req.adminId);

         const newRegistration = new WebinarRegistration({
            name,
            email,
            phonenumber,
            event
        });
    
       newRegistration.save();

        // Return the saved registration
        res.status(201).json({message:'Webinar registered successfully'});
    } catch (error) {
        console.error('Error registering for webinar', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

const getWebinars=async(req,res)=>{
try{ 
    const events=await WebinarRegistration.find();

    return res.status(200).json(events);
}catch(err){
    res.status(500).json({error:"event not fetched"})
}
   

   

}





const deleteWebinar=async(req,res)=>{
    const productId=req.params.webinarId;
    const products=await WebinarRegistration.findByIdAndDelete(productId);

    return res.status(200).json({products});

}


module.exports={addWebinar,getWebinars,deleteWebinar}