import React from "react";
import { useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
//font awesome icons
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const numOfItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar className="header-nav" variant="dark" expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="header-logo">
              <img src={logo} alt="logo" />
              Mustafa Shop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="header-links">
                  <FaShoppingCart /> Cart
                  <span className="numOfItems">
                    {cartItems.length > 0 && numOfItems}
                  </span>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  className="header-links"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="header-links">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
