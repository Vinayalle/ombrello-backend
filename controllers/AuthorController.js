
const Author=require('../models/Author');
const express= require('express');
const app=express();
const multer=require('multer');
const Admin = require('../models/Admin');


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


const addAuthor=async(req,res)=>{
   

    try{
        const {name,occupation,location} =req.body;

        const image=req.file?req.file.filename:undefined;
    const admin=await Admin.findById(req.adminId);

        const author=new Author({
            name,occupation,location,image ,admin:admin._id
        })
    
        await author.save();

        return res.status(201).json({message:"Author Created Successfully"});
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"});
    }
    
}

const getAuthors=async(req,res)=>{
try{ 
    const authors=await Author.find();

    return res.status(200).json(authors);
}catch(err){
    res.status(500).json({error:"authors not fetched"})
}
   

   

}

const getAuthor=async(req,res)=>{
    const authorId=req.params.id;
    const authors=await Author.findById(authorId);

    return res.status(200).json(authors);

}


module.exports={addAuthor:[upload.single('image'),addAuthor],getAuthors,getAuthor}