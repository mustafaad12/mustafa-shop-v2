import React from "react";
import { Row, Col } from "react-bootstrap";
//products data
import products from "../products.js";
//product card component
import Product from "../components/Product";
const HomeScreen = () => {
  return (
    <>
      <Row>
        <h1 className="home-screen-title">latest products</h1>
        {products.map((product, index) => {
          return (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
