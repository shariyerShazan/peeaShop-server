import bcrypt from "bcryptjs"
import { User } from "../models/user.model"

export const register = async  (req , res) =>{
     try {
        const {fullName  , email , password } = req.body
        if(!fullName  || !email || !password ){
          return res.status(400).json({
              message : "Something is missing" ,
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
            message : "Server error!" ,
            success: false
        })
     }
}

export const login = async (req , res) =>{
          try {
            
          } catch (error) {
            
          }
}

export const logout = async (req , res) =>{

}