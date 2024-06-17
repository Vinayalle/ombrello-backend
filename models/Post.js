const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    
    authorname:{
        type:String,
        required:true
    },
    image:{
        type:String
       
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
},{timestamps:true});

const Post=mongoose.model('Post',PostSchema);


module.exports=Post