export class OrderService {
  // @desc Add new order
  // @route Post /api/orders
  // @access Private
  addNewOrder() {
    return "order added";
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
  getMyOrders() {
    return "get user logged in orders";
  }

  // @desc Get order by id
  // @route Get /api/orders/:id
  // @access Private
  getOrderById() {
    return "get order by id";
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
