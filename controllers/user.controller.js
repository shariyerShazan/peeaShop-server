import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcryptjs"
import { User } from "../models/user.model"
import jwt from "jsonwebtoken"

export const register = async  (req , res) =>{
     try {
        const {fullName  , email , password } = req.body
        if(!fullName  || !email || !password ){
          return res.status(400).json({
              message : "Something is missing" ,
              success: false
          })
        }
        const user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({
                message : "User already exist with this email!" ,
                success: false
            })
        }
        if(password.length < 6){
          return res.status(400).json({
              message : "Password must be long than 6 cherecter" ,
              success: false
          })
        }
        if(!/[a-zA-Z]/.test(password)){
          return res.status(400).json({
              message : "Password must be contain a letter" ,
              success: false
          })
        }
        if(!/[\d]/.test(password)){
          return res.status(400).json({
              message : "Password must be contain a number" ,
              success: false
          })
        }
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await  User.create({
            fullName ,
            email ,
            password: hashedPassword
        })
        return res.status(200).json({
            message: "User Register successfully" ,
            success: true
        })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error!" ,
            success: false
        })
     }
}

export const login = async (req , res) =>{
          try {
               const {email , password}= req.body 
               if(!email || !password){
                return res.status(400).json({
                    message : "Something is missing" ,
                    success: false
                })
               }
               const user = await User.findOne({email: email}).select("+password")
               if(!user){
                return res.status(400).json({
                    message : "User not exist with this email" ,
                    success: false
                })
               }
               const validPassword = await bcrypt.compare(password , user.password)
               if(!validPassword){
                    return res.status(400).json({
                        message : "Invalid password" ,
                        success: false
                    })
               }
               const token =  jwt.sign({userId : user._id} , process.env.JWT_SECRET_KEY , {expiresIn: "3d"})
               return res.cookie("token" , token , {httpOnly: true , sameSite: "strict" , maxAge: 3*24*60*60*1000 ,}).status(200).json({
                message: `Welcome back ${user.fullName}` ,
                user,
                success: true
               })
          } catch (error) {
            console.log(error)
            return res.status(500).json({
                message : "Internal server error!" ,
                success: false
            })
          }
}

export const logout = async (req , res) =>{
    try {
        return res
  .clearCookie("token", {
    httpOnly: true,
    secure: true,  
    sameSite: "none",     
  })
  .status(200)
  .json({
    message: "User Logged out successfully",
    success: true
  });

    } catch (error) {
        console.log(error)
        res.status(500).json({
           message : "Internal server error" ,
           success: false
        }) 
    }
}




export const editUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { fullName, oldPassword, newPassword } = req.body;
    //   const pictureFile = req.file;
  
      const user = await User.findById(userId).select("+password");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      if (fullName) user.fullName = fullName;
  
    //   if (pictureFile) {
    //     user.profilePicture = pictureFile.path; 
    //   }
  
      if (oldPassword && newPassword) {
        const canChangePass = await bcrypt.compare(oldPassword, user.password);
        if (!canChangePass) {
          return res.status(400).json({
            message: "Old password is incorrect",
            success: false,
          });
        }
  
        if (newPassword.length < 6) {
          return res.status(400).json({
            message: "Password must be at least 6 characters",
            success: false,
          });
        }
        if (!/[a-zA-Z]/.test(newPassword)) {
          return res.status(400).json({
            message: "Password must contain a letter",
            success: false,
          });
        }
        if (!/[\d]/.test(newPassword)) {
          return res.status(400).json({
            message: "Password must contain a number",
            success: false,
          });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      const { password, ...safeUser } = user.toObject();
  
      return res.status(200).json({
        message: "User updated successfully",
        success: true,
        user: safeUser,
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error!",
        success: false,
      });
    }
  };
  