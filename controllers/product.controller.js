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

export const getAllProducts = async (req, res) => {};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

export const getSingleProduct = async (req, res) => {};
