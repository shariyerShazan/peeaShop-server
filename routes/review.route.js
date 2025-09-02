import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { addReview, deleteReview, getReviewByProduct } from "../controllers/review.controller.js"
const route = express.Router()

route.get("/reviews/:productId" , getReviewByProduct);
route.post("/add-review/:productId" , isAuthenticated , addReview);
route.delete("/delete-review/:reviewId" , isAuthenticated , deleteReview)