const Class=require('../models/Class');
const Admin=require('../models/Admin');


  
    const addClass=async(req,res)=>{
       try{
            
        const { className } = req.body;
            console.log(className);

           
        // const admin=await Admin.findById(req.adminId);
    
            const newclass=new Class({
                className
            })
        
            await newclass.save();
    
            return res.status(201).json({message:"Class Created Successfully"});
        }catch(err){
            console.log(err);
    
            res.status(500).json({error:"Internal Server error"});
        }
        
    }
    
    const getClasses=async(req,res)=>{
    try{ 
        const classes=await Class.find().sort({$natural:-1});
    
        return res.status(200).json(classes);
    }catch(err){
        res.status(500).json({error:"authors not fetched"})
    }
       
    
       
    
    }
    
    const getClass=async(req,res)=>{
        const classId=req.params.id;
        const classes=await Class.findById(classId);
    
        return res.status(200).json(classes);
    
    }
    const deleteClass=async(req,res)=>{
        const productId=req.params.classId;
        const products=await Class.findByIdAndDelete(productId);
    
        return res.status(200).json({products});
    
    }

    
    
    module.exports={addClass,getClasses,getClass,deleteClass}
