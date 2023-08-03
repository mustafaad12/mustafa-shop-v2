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
          const products = await this.service.getAllProducts({
            keyword: req.query.keyword,
            pageNumber: req.query.pageNumber,
          });
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

    this.router
      .route("/:id")
      .get(
        asyncHandler(async (req, res) => {
          const product = await this.service.getProductById(req.params.id);

          if (!product) {
            res.status(404);
            throw new Error("Product not found");
          }

          res.json(product);
        })
      )

      .put(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const data = req.body;

          const updatedProduct = await this.service.updateProduct({
            ...data,
            id: req.params.id,
          });

          res.status(200).json(updatedProduct);
        })
      )

      .delete(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const deletedProduct = await this.service.deleteProduct(
            req.params.id
          );

          res.status(200).json(deletedProduct);
        })
      );

    this.router.route("/:id/reviews").post(
      protect,
      asyncHandler(async (req, res) => {
        const data = req.body;

        const reviewMessage = await this.service.createReview({
          ...data,
          productId: req.params.id,
          userId: req.user._id,
          userName: req.user.name,
        });

        res.status(201).json(reviewMessage);
      })
    );
  }
}
