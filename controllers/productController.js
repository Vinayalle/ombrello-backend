
const Author=require('../models/Author');
const express= require('express');
const app=express();
const multer=require('multer');
const Admin = require('../models/Admin');
const Product = require('../models/Product');


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


const addProduct=async(req,res)=>{
   

    try{
        const {name,description,price} =req.body;

        const image=req.file?req.file.filename:undefined;
    const admin=await Admin.findById(req.adminId);

        const product=new Product({
            name ,description,price,image,admin:admin._id
        })
    
        await product.save();

        return res.status(201).json({message:"Product Added Successfully"});
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"});
    }
    
}

const getProducts=async(req,res)=>{
try{ 
    const products=await Product.find();

    return res.status(200).json(products);
}catch(err){
    res.status(500).json({error:"post not fetched"})
}
   

   

}

const getProduct=async(req,res)=>{
    const productId=req.params.id;
    const products=await Product.findById(productId);

    return res.status(200).json(products);

}


const updateProduct = async (req, res) => {
    try {
        const  productId  = req.params.productId; // Assuming the ID of the experiment to be updated is passed in the URL params

        console.log(productId);
    
        const {name,description,price} =req.body;

        

        // Check if the experiment exists
        const posts =  await Product.findById(productId);
        const image=req.file?req.file.filename:posts.image;
        if (!posts) {
            return res.status(404).json({ error: "post not found" });
        }

       

            
            
        // Update the fields if they are provided in the request body
        if (name) posts.name = name;
        if (description) posts.description = description;
        if (price) posts.price = price;
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

        return res.status(200).json({ message: "product updated successfully", post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    const products=await Product.findByIdAndDelete(productId);

    return res.status(200).json({products});

}


module.exports={addProduct:[upload.single('image'),addProduct],getProducts,getProduct,updateProduct:[upload.single('image'),updateProduct],deleteProduct}