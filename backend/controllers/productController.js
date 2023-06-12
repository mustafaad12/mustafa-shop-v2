import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProductService } from "../services/productServices.js";

export class ProductController {
  router;
  service;
  constructor() {
    this.router = Router();
    this.service = new ProductService();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route("/").get(
      asyncHandler(async (req, res) => {
        const products = await this.service.getAllProducts();
        if (products.length === 0) {
          res.status(404).json({ message: "Products not found" });
        }
        res.json(products);
      })
    );

    this.router.route("/:id").get(
      asyncHandler(async (req, res) => {
        const product = await this.service.getProductById(req.params.id);

        if (!product) {
          res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
      })
    );
  }
}
