import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
