import Order from "../models/orderModel.js";

export class OrderService {
  // @desc Add new order
  // @route Post /api/orders
  // @access Private
  async addNewOrder(
    {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    },
    userId
  ) {
    console.log();
    if (orderItems && orderItems.length === 0) {
      throw { status: 400, message: "No order items" };
    } else {
      const order = new Order({
        user: userId,
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id,
          _id: undefined,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      return createdOrder;
    }
  }

  // @desc Get all orders
  // @route Get /api/orders
  // @access Private/Admin
  getAllOrders() {
    return "get all orders";
  }

  // @desc Get user logged in orders
  // @route Get /api/orders/myorders
  // @access Private
  async getMyOrders(id) {
    return await Order.find({ user: id });
  }

  // @desc Get order by id
  // @route Get /api/orders/:id
  // @access Private
  async getOrderById(id) {
    const order = await Order.findById(id).populate("user", "name email");
    if (order) {
      return order;
    } else {
      throw { status: 404, message: "Order not found" };
    }
  }

  // @desc Update order to paid
  // @route Put /api/orders/:id/pay
  // @access Private
  updateOrderToPaid() {
    return "update order to paid";
  }

  // @desc Update order to delivered
  // @route Put /api/orders/:id/deliver
  // @access Private/Admin
  updateOrderToDelivered() {
    return "update order to delivered";
  }
}
