import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      className="spinner"
      animation="border"
      role="status"
      variant="success"
    ></Spinner>
  );
};

export default Loader;
