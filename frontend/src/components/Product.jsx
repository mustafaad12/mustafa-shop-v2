import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

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

            <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>

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
