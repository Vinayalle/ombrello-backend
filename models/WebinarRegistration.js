const mongoose=require('mongoose');
const WebinarRegistrationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
  
    phonenumber:{
        type: String,
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required:true
    },
    event:{
        type: String,
       
        required: true
    }

 
 
//     resetToken: { type: String },
//   resetTokenExpiration: { type: Date },
},{timestamps:true});

const WebinarRegistration=mongoose.model('WebinarRegistration',WebinarRegistrationSchema);


module.exports=WebinarRegistration