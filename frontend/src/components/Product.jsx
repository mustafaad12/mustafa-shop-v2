import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <>
      <Card className="product-card">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />

          <Card.Body>
            <Card.Title className="product-title">
              <h5>{product.name}</h5>
            </Card.Title>

            <Card.Text className="product-price" as="h4">
              ${product.price}
            </Card.Text>
          </Card.Body>
        </a>
      </Card>
    </>
  );
};

export default Product;
