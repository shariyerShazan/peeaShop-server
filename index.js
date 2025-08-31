import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./db/connectDB.js"


// Uncaught Exception handle
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception`);
    process.exit(1);
});


// middlewares
const app = express()
app.use(express.json()) 
app.use(cookieParser())
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





// 
const PORT = process.env.PORT || 6002

let server ;
const runServer = async ()=>{
    try {
       await connectDB()
        server = app.listen(PORT , ()=>{console.log(`Your server is running at http://localhost:${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}
runServer()


// Unhandled promise rejection handle
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to unhandled promise rejection`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on("uncaughtException")