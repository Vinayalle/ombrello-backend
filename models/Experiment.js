const mongoose=require('mongoose');
const ExperimentSchema=new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    selectedClass:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    // email:{
    //     type:String,
    //     required:true
    // },
    description:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
    videoLink:{
        type:String,

    },
    image:{
        type:String,
       
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
},{timestamps:true});

const Author=mongoose.model('Experiment',ExperimentSchema);


module.exports=Author