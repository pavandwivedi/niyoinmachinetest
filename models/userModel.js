import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    email:{
        type:String,
        require:true,
        unique:true
    },
    token:{
        type:String,  
    },
    emailStatus:{
        type:Boolean,
        default:false
    }
 
},
{
   timestamps:true
});
export const userModel = mongoose.model('users',userSchema);