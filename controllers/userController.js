import { userModel } from "../models/userModel.js";
import {error,success} from "../utills/responseWrapper.js";
import sendVerificationEmail from "../services/sendVerificationMail.js";
import generateVerificationCode from "../services/generateVerificationCode.js";
import { generateAccessToken } from "../services/generateAccessToken.js";

export async function registerController(req,res){
    try {
       const {email}=req.body;
       if(!email){
        return res.send(error(404,"email is required"));
       }
       const token = generateVerificationCode();
       const mailSent = await sendVerificationEmail(email,token);
       if(!mailSent){
         res .send(error(200,"mail  not send successfully"));
       } 
       res.send(success(200,"mail send successfully"));
       const user = await userModel.create({email,token});

    } catch (err) {
       return res.send(error(500,err.message));
    }
}
export async function verifyController(req,res){
    try {
        const { token,email } = req.body;
        
    const existingUser = await userModel.findOne({email});
    if(token ==existingUser.token){
        existingUser.emailStatus =true;
        await existingUser.save();
        res.status(200).send('Email verified successfully!');
    }
   
    } catch (err) {
        return res.send(error(500, err.message));
    }
}

export async function loginController(req,res){
    try {
        const {email} = req.body;
      const user = await userModel.findOne({email});
      if(!user){
        return res.send(error(404,"user not registered"));
      }
      if(user.emailStatus==true){
         const loginToken = generateAccessToken(...user);
          res.send(success(200,"user login successfully",loginToken));
      }else{
           res.send(error(500,"please verify the link "));
      }

    } catch (err) {
        return res.send(error(500,err.message));
    }
}