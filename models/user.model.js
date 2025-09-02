import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type: String ,
        required: true
    } ,
    email : {
        type: String  ,
        required: true ,
        umique: true 
    } ,
    password : {
        type: String ,
        required : true ,
        select: false
    } ,
    profilePicture: {
         type: String ,
         required : true
    } ,
    admin: {
        type: Boolean ,
        required : true ,
        default: false
    },
    resetPasswordToken: String ,
    resetPasswordExpired: Date ,
    
} , {timestamps: true})


export const User = mongoose.model("User" , userSchema)