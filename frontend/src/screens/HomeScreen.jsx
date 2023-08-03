import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
//product card component
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-dark">
          Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>{error.data.message || error.error}</h2>
      ) : (
        <>
          <Row>
            <h1 className="home-screen-title">latest products</h1>
            {data.products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
