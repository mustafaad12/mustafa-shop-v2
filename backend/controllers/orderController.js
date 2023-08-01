import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { OrderService } from "../services/orderService.js";
import { limiter } from "../utils/limiter.js";

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
        protect,
        limiter,
        asyncHandler(async (req, res) => {
          const userId = req.user._id;
          const data = req.body;

          const createdOrder = await this.service.addNewOrder(data, userId);

          res.status(201).json(createdOrder);
        })
      )

      //get all orders
      .get(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const orders = await this.service.getAllOrders();
          res.status(200).json(orders);
        })
      );

    //get user logged in orders
    this.router.get(
      "/myorders",
      protect,
      asyncHandler(async (req, res) => {
        const orders = await this.service.getMyOrders(req.user._id);
        res.status(200).json(orders);
      })
    );

    //get order by id
    this.router.get(
      "/:id",
      protect,
      asyncHandler(async (req, res) => {
        const order = await this.service.getOrderById(req.params.id);
        res.status(200).json(order);
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
      protect,
      admin,
      asyncHandler(async (req, res) => {
        const updatedOrder = await this.service.updateOrderToDelivered(
          req.params.id
        );
        res.status(200).json(updatedOrder);
      })
    );
  }
}
