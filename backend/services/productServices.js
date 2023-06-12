import Product from "../models/productModel.js";

export class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    const singleProduct = await Product.findById(id);
    return singleProduct;
  }
}
