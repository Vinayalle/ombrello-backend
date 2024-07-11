
const Author=require('../models/Author');
const express= require('express');
const app=express();
const multer=require('multer');
const Admin = require('../models/Admin');
const Post = require('../models/Post');


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


const addPost=async(req,res)=>{
   

    try{
        const {name,description,authorname,status} =req.body;

        const image=req.file?req.file.filename:undefined;
    const admin=await Admin.findById(req.adminId);

        const post=new Post({
            name ,description,authorname,status,image,admin:admin._id
        })
    
        await post.save();

        return res.status(201).json({message:"Post Created Successfully"});
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"});
    }
    
}


const getAllPosts = async (req, res) => {
    try { 
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ error: "Posts not fetched" });
    }
}
const getPosts = async (req, res) => {
    try { 
        const posts = await Post.find({ status: 'published' });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ error: "Posts not fetched" });
    }
}

const getPost=async(req,res)=>{
    const postId=req.params.id;
    const posts=await Post.findById(postId);

    return res.status(200).json(posts);

}


const updatePost = async (req, res) => {
    try {
        const  postId  = req.params.id; // Assuming the ID of the experiment to be updated is passed in the URL params

        console.log(postId);
    
        const { name,description,authorname,status } = req.body;
        

        // Check if the experiment exists
        const posts =  await Post.findById(postId);
        const image=req.file?req.file.filename:posts.image;
        if (!posts) {
            return res.status(404).json({ error: "post not found" });
        }

       

            
            
        // Update the fields if they are provided in the request body
        if (name) posts.name = name;
        if (description) posts.description = description;
        if (authorname) posts.authorname = authorname;
        if (status) posts.status = status;
        // if (subject) experiments.subject = subject;
        // if (tags) experiments.tags = tags;
        // if (likes) experiments.likes = likes;
        // if (videoLink) experiments.videoLink = videoLink;
        if (image) posts.image=image;
     
        console.log(posts);
        // If there's a file in the request, update the image
        // if (req.file) {
        //     experiment.image = req.file?req.file.filename:experiment.image;;
        // }

        // Save the updated experiment
        const post = await posts.save(); // Reassigning the updated experiment

        console.log(post); // Confirming the updated experiment

        return res.status(200).json({ message: "post updated successfully", post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
}





const deletePost=async(req,res)=>{
    const postId=req.params.id;
    const posts=await Post.findByIdAndDelete(postId);

    return res.status(200).json({posts});

}

module.exports={addPost:[upload.single('image'),addPost],getPosts,getPost,getAllPosts,updatePost:[upload.single('image'),updatePost],deletePost}