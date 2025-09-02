import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller"

const route = express.Router()

route.post("/create-product" , isAuthenticated , createProduct)
route.get("/products" , getAllProducts) 
route.get("/single-product/:productId" , getSingleProduct)
route.patch("/edit-product/:productId" , isAuthenticated , updateProduct)
route.delete("/delete-product/:productId" , isAuthenticated , deleteProduct)