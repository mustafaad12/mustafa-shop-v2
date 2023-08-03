import Product from "../models/productModel.js";

export class ProductService {
  // @desc Fetch All Products
  // @route GET / api/products
  // @ access Public
  async getAllProducts({ keyword, pageNumber }) {
    const pageLimit = 8;
    const page = Number(pageNumber) || 1;

    const search_keyword = keyword
      ? { name: { $regex: keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...search_keyword });

    const products = await Product.find({ ...search_keyword })
      .limit(pageLimit)
      .skip(pageLimit * (page - 1));

    return { products, page, pages: Math.ceil(count / pageLimit) };
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
  async createReview({ rating, comment, productId, userId, userName }) {
    const product = await Product.findById(productId);

    if (product) {
      const existReview = product.reviews.find(
        (review) => review.user.toString() === userId.toString()
      );

      if (existReview) {
        throw { status: 400, message: "Product already reviewed" };
      }

      const review = {
        user: userId,
        name: userName,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      await product.save();
      return "Review added";
    } else {
      throw { status: 404, message: "Product not found" };
    }
  }

  // @desc Get top rated Products
  // @route Get / api/products/top
  // @ access Public
  async getTopProducts() {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    return products;
  }
}
