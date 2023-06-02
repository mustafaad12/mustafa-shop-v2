import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />

          <Card.Body>
            <Card.Title className="product-title">
              <h5>{product.name}</h5>
            </Card.Title>

            <Card.Text className="product-price" as="h4">
              ${product.price}
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default Product;
