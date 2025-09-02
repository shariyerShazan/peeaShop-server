import { Product } from "../models/product.model";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, productCategory, stock } =
      req.body;
    if (!productName || !description || !price || !productCategory || !stock) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const newProduct = await Product.create({
      productName,
      description,
      price,
      productCategory,
      stock,
      createdBy : req.userId
    });
    return res.status(200).json({
        message : "Product created successfully" ,
        success: true ,
        product : newProduct
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};


export const getAllProducts = async (req, res) => {
    try {
        const {searchText , page , limit} = req.query ;
        let query = {}
        if(searchText){
            query.$or = [
                {productName : {$regex: searchText , $options: "i"}},
                {description : {$regex: searchText , $options: "i"}},
                {productCategory : {$regex: searchText , $options: "i"}}
            ]
        }
        const pageNumber = parseInt(page) || 1 ;
        const pageLimit = parseInt(limit) || 10 ;
        const skip = (pageNumber - 1) * pageLimit;

        const products = await Product.find(query).skip(skip).limit(pageLimit).sort({createdAt : -1});
        const totalProduct = await Product.countDocuments(query)
        return res.status(200).json({
            message : "All product fetched" ,
            products , 
            page : pageNumber ,
            limit : pageLimit ,
            totalPages: Math.ceil(totalProduct / pageLimit)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false,
        });
    }
};


export const updateProduct = async (req, res) => {
     try {
        const {productId} = req.params 
        const { productName, description, price, productCategory, stock } = req.body;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                message : "Product not found" ,
                success: false
            })
        }
        if(productName){product.productName = productName};
        if(description){product.description = description} ;
        if(price){product.price = price};
        if(productCategory){product.productCategory = productCategory};
        if(stock){product.stock = stock};
        await product.save()
        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product
          });
     } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false,
        });
     }
};

export const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params 
       
        const product = await Product.findOneAndDelete({_id: productId , createdBy : req.userId})
        if(!product){
            return res.status(400).json({
                message : "Your can't delete this product",
                success: false
            })
        }
        return res.status(200).json({
            message : "Product deleted",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false,
        });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const {productId} = req.params 
        if(!productId){
            return res.status(400).json({
                message : "Product id is required" ,
                success: false
            })
        }
        const product = await Product.findById(productId)
        return res.status(200).json({
            message : "Product fetched successfully",
            product,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal server error!",
          success: false,
        });
    }
};
