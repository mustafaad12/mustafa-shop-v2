import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are youe sure you want to delete the pooduct")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} className="btn-sm m-3">
            Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreateProduct && <Loader />}
      {loadingDeleteProduct && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(product._id)}
                      className="btn-sm"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
