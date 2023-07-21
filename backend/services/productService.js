import Product from "../models/productModel.js";

export class ProductService {
  // @desc Fetch All Products
  // @route GET / api/products
  // @ access Public
  async getAllProducts() {
    return await Product.find();
  }
  // @desc Fetch a Product
  // @route GET / api/products/:id
  // @ access Public
  async getProductById(id) {
    const singleProduct = await Product.findById(id);
    return singleProduct;
  }
  // @desc Create a Product
  // @route POST / api/products
  // @ access Private/Admin
  async createProduct(id) {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();

    return createdProduct;
  }
}
