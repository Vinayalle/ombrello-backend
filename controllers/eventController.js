
// const Author=require('../models/Author');
const express= require('express');
const app=express();
const multer=require('multer');
const Event = require('../models/Event');
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


const addEvent=async(req,res)=>{
   

    try{
        const {name,description,date,location, organizer,status} =req.body;

        const image=req.file?req.file.filename:undefined;
    // const admin=await Admin.findById(req.adminId);

        const event=new Event({
            name,description,date,location, organizer,status,image
        })
    
        await event.save();

        return res.status(201).json({message:"Event Created Successfully"});
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"});
    }
    
}

const getEvents=async(req,res)=>{
try{ 
    const events=await Event.find();

    return res.status(200).json(events);
}catch(err){
    res.status(500).json({error:"event not fetched"})
}
   

   

}

const getEvent=async(req,res)=>{
    const eventId=req.params.id;
    const events=await Event.findById(eventId);

    return res.status(200).json(events);

}


const updateEvent = async (req, res) => {
    try {
        const  eventId  = req.params.eventId; // Assuming the ID of the experiment to be updated is passed in the URL params

        console.log(eventId);
    
        const {name,description,date,location, organizer,status} =req.body;

        

        // Check if the experiment exists
        const events =  await Event.findById(eventId);
        const image=req.file?req.file.filename:events.image;
        if (!events) {
            return res.status(404).json({ error: "event not found" });
        }

       

            
            
        // Update the fields if they are provided in the request body
        if (name) events.name = name;
        if (description) events.description = description;
        if (date) events.date = date;
        if (location) events.location = location;
        if (organizer) events.organizer = organizer;
        if (status) events.status = status;
        // if (subject) experiments.subject = subject;
        // if (tags) experiments.tags = tags;
        // if (likes) experiments.likes = likes;
        // if (videoLink) experiments.videoLink = videoLink;
        if (image) events.image=image;
     
        console.log(events);
        // If there's a file in the request, update the image
        // if (req.file) {
        //     experiment.image = req.file?req.file.filename:experiment.image;;
        // }

        // Save the updated experiment
        const event = await events.save(); // Reassigning the updated experiment

        console.log(event); // Confirming the updated experiment

        return res.status(200).json({ message: "event updated successfully", event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
}

const deleteEvent=async(req,res)=>{
    const productId=req.params.id;
    const products=await Event.findByIdAndDelete(productId);

    return res.status(200).json({products});

}


module.exports={addEvent:[upload.single('image'),addEvent],getEvents,getEvent,updateEvent:[upload.single('image'),updateEvent],deleteEvent}