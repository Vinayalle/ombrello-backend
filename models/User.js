const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    phonenumber:{
        type: String,
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        // enum : ['student','teacher'],
        // default: 'student'
    },
//     resetToken: { type: String },
//   resetTokenExpiration: { type: Date },
},{timestamps:true});

const User=mongoose.model('User',UserSchema);


module.exports=User