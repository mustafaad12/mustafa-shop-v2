import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";

import { ProductController } from "./controllers/productController.js";
import { UserController } from "./controllers/userController.js";
import { OrderController } from "./controllers/orderController.js";
import uploadController from "./controllers/uploadController.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", new ProductController().router);
app.use("/api/users", new UserController().router);
app.use("/api/orders", new OrderController().router);
app.use("/api/upload", uploadController);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use([notFound, errorHandler]);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
