import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="py-3">Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}
                {order.shippingAddress.country} {order.shippingAddress.city}
                {order.shippingAddress.postalCode}
              </p>
              <div>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: {order.paymentMethod}</strong>
              </p>
              <div>
                {order.isPaid ? (
                  <Message variant="success">
                    Delivered on {order.paidAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => {
                  return (
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image
                            fluid
                            rounded
                            src={item.image}
                            alt={order.name}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Items Price</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
