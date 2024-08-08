
const express= require('express');
const app=express();
const fs = require('fs');
const multer=require('multer');
const Admin = require('../models/Admin');
const Experiment=require('../models/Experiment');
const User = require('../models/User');
const path = require('path');



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

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



const addExperiment=  async(req,res)=>{
   

    try{
        const {name, description, shortDescription,selectedClass, subject,tags,likes,videoLink} =req.body;

        const image=req.file?req.file.filename:undefined;
    const admin=await Admin.findById(req.adminId);

        const experiment=new Experiment({
            name,description,shortDescription,selectedClass,subject,tags,likes,videoLink,image ,admin:admin._id
        })
    
        await experiment.save();

        return res.status(201).json({message:"Experiment Added Successfully"});
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"});
    }
    
}

const getExperiments=async(req,res)=>{
try{ 
    
    const experiments=await Experiment.find().sort({$natural:-1});

    return res.status(200).json(experiments);
}catch(err){
    res.status(500).json({error:"experiment not fetched"})
}
   

   

}

const getTotalExperiments=async(req,res)=>{
    try{ 
        
        const experiments=await Experiment.find().sort({$natural:-1});
    
        return res.status(200).json(experiments);
    }catch(err){
        res.status(500).json({error:"experiment not fetched"})
    }
       
    
       
    
    }

    const getExperimentByFilter=async(req,res)=>{
        const { className, subjectName, experimentName } = req.params;
        console.log(className,subjectName)
        const selectedClass=className;
        const subject=subjectName;

  try {
    const experiment2 = await Experiment.findOne({ 
      selectedClass, 
      subject, 
      name: experimentName 
    });
    console.log(experiment2);
    if (experiment2) {
      res.json(experiment2);
    } else {
      res.status(404).json({ message: 'Experiment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
    
    }

    const getExperimentByFilterByCategory=async(req,res)=>{
        const { className, subjectName } = req.params;
        console.log(className,subjectName)
        const selectedClass=className;
        const subject=subjectName;

  try {
    const experiment2 = await Experiment.find({ 
        selectedClass: selectedClass, 
        subject: subject 
      
    });
    console.log(experiment2);
    if (experiment2) {
      res.json(experiment2);
    } else {
      res.status(404).json({ message: 'Experiment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
    
    }


    
    const getExperimentByFilterByCategory1 = async (req, res) => {
      const { classN, subject } = req.params;
    
      console.log(`Class Name: ${classN}, Subject Name: ${subject}`);
      
      try {
          const experiments = await Experiment.find({ 
              selectedClass: classN, 
              subject: subject 
          });
  
          console.log(experiments);
  
          if (experiments.length > 0) {
              res.json(experiments);
          } else {
              res.status(404).json({ message: 'Experiments not found' });
          }
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };
  

const getExperiment=async(req,res)=>{
    const experimentId=req.params.id;
    const experiments=await Experiment.findById(experimentId);

    return res.status(200).json(experiments);

}


const updateExperiment = async (req, res) => {
    try {
        const  experimentId  = req.params.id; // Assuming the ID of the experiment to be updated is passed in the URL params

        console.log(experimentId);
    
        const { name, description,shortDescription, selectedClass, subject, tags, likes, videoLink } = req.body;
        

        // Check if the experiment exists
        const experiments =  await Experiment.findById(experimentId);
        const image=req.file?req.file.filename:experiments.image;
        if (!experiments) {
            return res.status(404).json({ error: "Experiment not found" });
        }

       

            
            
        // Update the fields if they are provided in the request body
        if (name) experiments.name = name;
        if (description) experiments.description = description;
        if (shortDescription) experiments.shortDescription = shortDescription;
        if (selectedClass) experiments.selectedClass = selectedClass;
        if (subject) experiments.subject = subject;
        if (tags) experiments.tags = tags;
        if (likes) experiments.likes = likes;
        if (videoLink) experiments.videoLink = videoLink;
        if (image) experiments.image=image;
     
        console.log(experiments);
        // If there's a file in the request, update the image
        // if (req.file) {
        //     experiment.image = req.file?req.file.filename:experiment.image;;
        // }

        // Save the updated experiment
        const experiment = await experiments.save(); // Reassigning the updated experiment

        console.log(experiment); // Confirming the updated experiment

        return res.status(200).json({ message: "Experiment updated successfully", experiment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
}


const deleteExperiment=async(req,res)=>{
    const experimentId=req.params.id;
    const experiments=await Experiment.findByIdAndDelete(experimentId);

    return res.status(200).json({experiments});

}
const updateLikes=async(req,res)=>{
    // const experimentId=req.params.id;
    // const experiments=await Experiment.findById(experimentId);

    try {
        const experimentId=req.params.id;
        const experiment=await Experiment.findById(experimentId);
        if (!experiment) {
          return res.status(404).json({ message: 'Experiment not found' });
        }
        if (experiment.likedBy.includes(req.userId)) {
            return res.status(400).json({ message: 'You have already liked this post' });
          }
      
          // Add the user's ID to the likedBy array and increment likes count
          experiment.likedBy.push(req.userId);
    
        // Increment likes count
        experiment.likes += 1;
        await experiment.save();
        res.json({ message: 'Experiment liked successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

    

}


module.exports={addExperiment:[upload.single('image'),addExperiment],getExperiments,getExperiment,updateExperiment:[upload.single('image'),updateExperiment],deleteExperiment,updateLikes,getTotalExperiments,getExperimentByFilter,getExperimentByFilterByCategory,getExperimentByFilterByCategory1}