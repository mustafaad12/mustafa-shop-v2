import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
//product card component
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const jsonData = await response.json();
      setProducts(jsonData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Row>
        <h1 className="home-screen-title">latest products</h1>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
