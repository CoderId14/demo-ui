import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/store";
import { useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export const NavbarMain = () => {
  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;
  const accessToken = user?.accessToken ? user.accessToken : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (user) logOut(dispatch, user.username, navigate, accessToken);
  };

  useEffect(() => {
    if (!user) {
    }
  }, []);

  // const handleClick = () => {
  //   useEffect(() => {
  //     if (user) {
  //       alert("You already login");
  //       navigate("/");
  //     }
  //   }, []);
  // }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
