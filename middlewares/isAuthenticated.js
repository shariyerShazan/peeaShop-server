import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

export const isAuthenticated = (req , res , next)=>{
    try {
        const token = req.cookies.token ;
        if(!token){
            return res.status(400).json({
                message : "User not Autheticated!" ,
                success: false
            })
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(400).json({
                message : "Invalid token!" ,
                success: false
            })
        }
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
    }
}