import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
       productName : {
        type : String ,
        required: true ,
        trim : true
       } ,
       description: {
        type: String ,
        required: true ,
        trim : true 
       } ,
       price: {
        type: Number ,
        required: true 
       },
        productImage: [
                {
                    imageNo: {
                        type: Number ,
                        required: true 
                    },
                    url: {
                        type: String ,
                        required: true
                    }
                }
            ] ,
            productCategory : {
                type: String ,
                required: true
            },
            stock: {
                type: Number ,
                required: true
            },
            numberOfReviews: {
                type: Number ,
                required: true
            },
            rating: {
                type: Number ,
                default: 0
               },
            createdBy : {
                type: mongoose.Schema.Types.ObjectId ,
                ref: "User" ,
                required : true
            }
            
}, {timestamps: true})

export const Product = mongoose.model("Product" , productSchema)
