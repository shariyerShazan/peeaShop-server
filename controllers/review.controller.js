import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const { rating, comment } = req.body;

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false
      });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    await Review.create({
      product: productId,
      reviewedBy: req.userId,
      rating,
      comment,
    });

    const totalReview = await Review.countDocuments({ product: productId });
    const stats = await Review.aggregate([
      { $match: { product: product._id } },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" }
        }
      }
    ]);

    const avgRating = stats.length > 0 ? stats[0].avgRating : 0;

    product.numberOfReviews = totalReview;
    product.rating = avgRating;
    await product.save();

    return res.status(201).json({
      message: "Review added successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false
    });
  }
};


export const getReviewByProduct = async (req , res)=>{
    try {
        const {productId} = req.params
        const reviews = await Review.find({ product: productId })
        if(!reviews){
            return res.stats(404).json({
                message : "Review not found" ,
                success : false
            })
        }
        return res.stats(200).json({
            message : "Reviews here" ,
            success: true ,
            reviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false
        });
    }
}


export const deleteReview = async (req, res)=>{
    try {
        const {reviewId} = req.params
        const review = await Review.findOneAndDelete({
            reviewedBy: req.userId ,
            _id : reviewId
        })
        if(!review){
            return res.stats(200).json({
                message : "Your can't deleted this review" ,
                success: false
            })
        }
            return res.stats(200).json({
                message : "Review deleted" ,
                success: true
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false
        });
    }
}