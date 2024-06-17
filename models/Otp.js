const mongoose=require('mongoose');
const OtpSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    
    mobile:{
        type: String,
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required:true
    },

    password:{
        type:String,
        required:true
    },
   
},{timestamps:true});

const Otp=mongoose.model('Otp',OtpSchema);


module.exports=Otp