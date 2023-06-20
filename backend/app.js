import express from "express";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import { connectDB } from "./config/db.js";

import { ProductController } from "./controllers/productController.js";
import { UserController } from "./controllers/userController.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", new ProductController().router);
app.use("/api/users", new UserController().router);

app.use([notFound, errorHandler]);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
