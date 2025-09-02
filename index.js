import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"

// Uncaught Exception handle
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception`);
    process.exit(1);
});


// Express app setup
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Test API
app.get("/", (_, res) => {
    res.status(200).json({
        message: "Your server is running",
        success: true,
    });
});
// api here
app.use("/api/v1/users" , userRoutes)
app.use("/api/v1/products" , productRoutes)



// Database & Server
const PORT = process.env.PORT || 6002;

let server;

const runServer = async () => {
    try {
        await connectDB();
        server = app.listen(PORT, () => {
            console.log(`Your server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

runServer();

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(
        "Server is shutting down due to unhandled promise rejection"
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
