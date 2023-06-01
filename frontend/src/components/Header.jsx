import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
//font awesome icons
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Mustafa Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link href="#link">
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
