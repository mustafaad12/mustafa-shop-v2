import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`
      );
      const jsonData = await response.json();
      setProduct(jsonData);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Row className="product-container">
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>${product.price}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <ListGroup className="product-screen-third-list-group">
            <ListGroup.Item>
              <Row>
                <Col>price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>status:</Col>
                <Col>{product.countInStock > 0 && "In Stock"}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className="product-screen-btn">
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add To Card
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
