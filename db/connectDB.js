import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB