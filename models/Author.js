const mongoose=require('mongoose');
const AuthorSchema=new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    // email:{
    //     type:String,
    //     required:true
    // },
    occupation:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
       
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
},{timestamps:true});

const Author=mongoose.model('Author',AuthorSchema);


module.exports=Author