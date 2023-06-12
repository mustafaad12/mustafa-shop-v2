import { Router } from "express";
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
    this.router.route("/").get(async (req, res) => {
      try {
        const products = await this.service.getAllProducts();
        if (products.length === 0) {
          res.status(404).json({ error: "no products found" });
        }
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
    });

    this.router.route("/:id").get(async (req, res) => {
      res.send(await this.service.getProductById(req.params.id));
    });
  }
}
