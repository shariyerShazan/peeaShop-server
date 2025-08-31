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
       allRating: {
        type: Number ,
        default: 0
       } ,
        productImage: [
                {
                    publicId: {
                        type: String ,
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
                type: String ,
                required: true
            },
            reviews: [
                {
                    reviewedBy: {
                        type: mongoose.Schema.Types.ObjectId , ref: "User" , required: true 
                    } ,
                    rating: {
                        type: Number ,
                        required: true
                    } ,
                    comment: {
                        type: String ,
                        required: true
                    }
                }
            ]
}, {timestamps: true})

export default Product = mongoose.model("Product" , productSchema)
