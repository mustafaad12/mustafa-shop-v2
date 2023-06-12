import Product from "../models/productModel.js";

export class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  getProductById(id) {
    const singleProduct = sampleProducts.find((p) => p._id == id);
    return singleProduct;
  }
}
