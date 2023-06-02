import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
//font awesome icons
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <Navbar className="header-nav" variant="dark" expand="md">
        <Container>
          <Navbar.Brand className="header-logo" href="#home">
            <img src={logo} alt="logo" />
            Mustafa Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="header-links" href="#home">
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link className="header-links" href="#link">
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
