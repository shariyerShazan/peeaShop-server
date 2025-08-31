import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"


// middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173" ,
    credentials: true
}))


// server run api here
app.get("/" , (_ , res)=>{
    try {
        res.status(200).json({
            message : "Your server is running" ,
            success: true
        })
    } catch (error) {
        res.status(200).json({
            message : "Something went wrong!" ,
            success: false
        })
    }
})

// api for app
const PORT = process.env.PORT || 6002

const runServer = async ()=>{
    try {
        app.listen(PORT , ()=>{console.log(`Your server is running at http://localhost:${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}
runServer()