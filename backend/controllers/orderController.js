import { Router } from "express";
import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { OrderService } from "../services/orderService.js";

export class OrderController {
  router;
  service;
  constructor() {
    this.router = Router();
    this.service = new OrderService();
    this.setRoutes();
  }

  setRoutes() {
    //create new order
    this.router
      .route("/")
      .post(
        asyncHandler(async (req, res) => {
          res.send(await this.service.addNewOrder());
        })
      )

      //get all orders
      .get(
        asyncHandler(async (req, res) => {
          res.send(await this.service.getAllOrders());
        })
      );

    //get user logged in orders
    this.router.get(
      "/myorders",
      asyncHandler(async (req, res) => {
        res.send(await this.service.getMyOrders());
      })
    );

    //get order by id
    this.router.get(
      "/:id",
      asyncHandler(async (req, res) => {
        res.send(await this.service.getOrderById());
      })
    );

    //update order to paid
    this.router.put(
      "/:id/pay",
      asyncHandler(async (req, res) => {
        res.send(await this.service.updateOrderToPaid());
      })
    );

    //update order to delivered
    this.router.put(
      "/:id/deliver",
      asyncHandler(async (req, res) => {
        res.send(await this.service.updateOrderToDelivered());
      })
    );
  }
}
