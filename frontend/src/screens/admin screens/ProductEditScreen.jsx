import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetSingleProductQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist">Go Back</Link>

      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler} className="product-edit-form">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type="file"
                label="choose image"
                onChange={uploadImageHandler}
              />
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="product-edit-btn"
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditScreen;
