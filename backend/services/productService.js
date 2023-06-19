import Product from "../models/productModel.js";

export class ProductService {
  // @desc Fetch All Products
  // @route GET / api/products
  // @ access Public
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    // @desc Fetch a Product
    // @route GET / api/products/:id
    // @ access Public
    const singleProduct = await Product.findById(id);
    return singleProduct;
  }
}
