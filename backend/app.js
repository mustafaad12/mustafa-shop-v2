import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ProductController } from "./controllers/productController.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", new ProductController().router);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
