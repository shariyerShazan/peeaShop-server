import express from "express"
import { editUser, login, logout, register } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
const route = express.Router()

route.post("/register" , register)
route.post("/login" , login)
route.post("/logout" , logout)
route.patch("edit" , isAuthenticated , editUser)

export default route;