import React from "react";
import { Row, Col } from "react-bootstrap";
//product card component
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error.data.message || error.error}</h2>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
