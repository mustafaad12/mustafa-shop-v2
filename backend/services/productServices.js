import sampleProducts from "../sample data/products.js";

export class ProductService {
  getAllProducts() {
    return sampleProducts;
  }

  getProductById(id) {
    const singleProduct = sampleProducts.find((p) => p._id == id);
    return singleProduct;
  }
}
