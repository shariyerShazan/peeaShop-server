import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String ,
            required: true 
        },
        city: {
            type: String ,
            required: true 
        },
        country: {
            type: String ,
            required: true 
        } ,
        phoneNumber: {
            type: String ,
            required: true 
        }
    } ,
      orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId ,
                ref: "Product" ,
                required : true
            },
            quantity: {
                type: Number ,
                required: true ,
                default: 1
            } ,
            totalPrice: {
                type: Number ,
                required: true
            }
        }
      ],
      orderBy: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User" ,
        required : true
      },
      status: {
        type: String,
        enum: ["pending" , "confirmed", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, {timestamps: true})


export const Order = mongoose.model("Order" , orderSchema)