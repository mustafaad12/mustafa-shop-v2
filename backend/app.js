import express from "express";
import { ProductController } from "./controllers/productController.js";

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", new ProductController().router);

app.listen(port, () => console.log("API is running on port 3000"));
