import React from "react";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCardHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const subTotal = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <h1>your cart is empty</h1>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item._id}`}> {item.name} </Link>
                      </Col>
                      <Col md={2}>$ {item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            addToCardHandler(item, Number(e.target.value));
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeFromCartHandler(item._id)}
                          type="button"
                          varient="light"
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h3>
                    Subtotal {subTotal} {subTotal > 1 ? "items" : "item"}
                  </h3>
                  $ {cart.itemsPrice}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button onClick={checkoutHandler} className="btn btn-block">
                    checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;

// import React from "react";
// import { addToCart, removeFromCart } from "../slices/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
// } from "react-bootstrap";
// import { FaTrash } from "react-icons/fa";

// const CartScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const addToCardHandler = (item, qty) => {
//     dispatch(addToCart({ ...item, qty }));
//   };

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   return (
//     <>
//       <Row>
//         <Col md={8}>
//           {cartItems.length === 0 ? (
//             <h1>your cart is empty</h1>
//           ) : (
//             <ListGroup variant="flush">
//               {cartItems.map((item) => {
//                 return (
//                   <ListGroup.Item key={item._id}>
//                     <Row>
//                       <Col md={2}>
//                         <Image src={item.image} alt={item.name} fluid rounded />
//                       </Col>
//                       <Col md={3}>
//                         <Link to={`/products/${item._id}`}> {item.name} </Link>
//                       </Col>
//                       <Col md={2}>$ {item.price}</Col>
//                       <Col md={2}>
//                         <Form.Control
//                           as="select"
//                           value={item.qty}
//                           onChange={(e) => {
//                             addToCardHandler(item, Number(e.target.value));
//                           }}
//                         >
//                           {[...Array(item.countInStock).keys()].map((x) => {
//                             return (
//                               <option key={x + 1} value={x + 1}>
//                                 {x + 1}
//                               </option>
//                             );
//                           })}
//                         </Form.Control>
//                       </Col>
//                       <Col md={2}>
//                         <Button
//                           onClick={() => removeFromCartHandler(item._id)}
//                           type="button"
//                           varient="light"
//                         >
//                           <FaTrash />
//                         </Button>
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                 );
//               })}
//             </ListGroup>
//           )}
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup>
//               <ListGroup.Item>
//                 <h3>
//                   Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
//                   {cartItems.length > 1 ? "items" : "item"}
//                 </h3>
//                 $ {cart.itemsPrice}
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button className="btn btn-block">checkout</Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default CartScreen;
