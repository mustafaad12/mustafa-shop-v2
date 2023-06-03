import { Router } from "express";
import { ProductService } from "../services/productServices.js";

export class ProductController {
  router;
  constructor() {
    this.router = Router();
    this.service = new ProductService();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route("/").get(async (req, res) => {
      res.json(await this.service.getAllProducts());
    });

    this.router.route("/:id").get(async (req, res) => {
      res.send(await this.service.getProductById(req.params.id));
    });
  }
}
