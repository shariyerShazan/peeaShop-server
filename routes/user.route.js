import express from "express"
import { login, logout, register } from "../controllers/user.controller"
const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/logout" , logout)


export default route