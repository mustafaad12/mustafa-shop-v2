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

  // @desc Update a Product
  // @route Put / api/products/:id
  // @ access Private/Admin
  async updateProduct({
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    id,
  }) {
    const product = await Product.findById(id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      return updatedProduct;
    } else {
      throw { status: 404, message: "Product not found" };
    }
  }

  // @desc Delete a Product
  // @route Delete / api/products/:id
  // @ access Private/Admin
  async deleteProduct(id) {
    const product = await Product.findById(id);

    if (product) {
      await Product.findByIdAndDelete(id);
      return product;
    } else {
      throw { status: 404, message: "Product not found" };
    }
  }

  // @desc Create a new review
  // @route Post / api/products/:id/review
  // @ access Private
  async createReview({ rating, comment, id }) {
    const product = await Product.findById(id);

    if (product) {
      const existReview = product.reviwes.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (existReview) {
        throw { status: 400, message: "Product already reviewed" };
      }

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviwes.push(review);

      product.numReviews = product.reviwes.length();

      product.rating =
        product.reviwes.reduce((acc, review) => acc + review.rating, 0) /
        product.reviwes.length();

      await product.save();
      return "Review added";
    } else {
      throw { status: 404, message: "Product not found" };
    }
  }
}
