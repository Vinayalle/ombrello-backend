const Subject=require('../models/Subject');
const Admin=require('../models/Admin');


  
    const addSubject=async(req,res)=>{
   

        try{
            const {name} =req.body;
            
    
           
        // const admin=await Admin.findById(req.adminId);
    
            const subject=new Subject({
                name 
            })
        
            await subject.save();
    
            return res.status(201).json({message:"subject Added Successfully"});
        }catch(err){
            console.log(err);
    
            res.status(500).json({error:"Internal Server error"});
        }
        
    }
    
    const getSubjects=async(req,res)=>{
    try{ 
        const subjects=await Subject.find();
    
        return res.status(200).json(subjects);
    }catch(err){
        res.status(500).json({error:"Subjects not fetched"})
    }
       
    
       
    
    }
    
    const getSubject=async(req,res)=>{
        const subjectId=req.params.id;
        const subjects=await Subject.findById(subjectId);
    
        return res.status(200).json(subjects);
    
    }
    const deleteSubject=async(req,res)=>{
        const subjectId=req.params.subjectId;
        const subjects=await Subject.findByIdAndDelete(subjectId);
    
        return res.status(200).json({subjects});
    
    }

    
    
    module.exports={addSubject,getSubjects,getSubject,deleteSubject}
