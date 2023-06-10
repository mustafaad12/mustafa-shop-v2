import express from "express";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import { connectDB } from "./config/db.js";

import { ProductController } from "./controllers/productController.js";

connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", new ProductController().router);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
