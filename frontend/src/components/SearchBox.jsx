import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="search-form">
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Product"
        className="search-input"
      />
      <Button className="search-btn" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
