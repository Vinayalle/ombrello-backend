const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
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

const Product=mongoose.model('Product',ProductSchema);


module.exports=Product