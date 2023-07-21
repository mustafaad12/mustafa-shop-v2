import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProductService } from "../services/productService.js";
import { protect, admin } from "../middleware/authMiddleware.js";

export class ProductController {
  router;
  service;
  constructor() {
    this.router = Router();
    this.service = new ProductService();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route("/")
      .get(
        asyncHandler(async (req, res) => {
          const products = await this.service.getAllProducts();
          if (products.length === 0) {
            res.status(404);
            throw new Error("Products not found");
          }
          res.json(products);
        })
      )

      .post(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const createdProduct = await this.service.createProduct(req.user._id);

          res.status(201).json(createdProduct);
        })
      );

    this.router.route("/:id").get(
      asyncHandler(async (req, res) => {
        const product = await this.service.getProductById(req.params.id);

        if (!product) {
          res.status(404);
          throw new Error("Product not found");
        }

        res.json(product);
      })
    );
  }
}
